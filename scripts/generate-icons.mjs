import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transform } from '@svgr/core'
import { format } from 'prettier'

const ROOT_DIR = process.cwd()
const ICON_ROOT_DIR = join(ROOT_DIR, 'src', 'shared', 'assets', 'icons')
const RAW_DIR = join(ICON_ROOT_DIR, 'raw')
const COMPONENT_DIR = join(ICON_ROOT_DIR, 'components')
const INDEX_FILE = join(ICON_ROOT_DIR, 'index.ts')

const HEADER_COMMENT = ['/**', ' * AUTO-GENERATED FILE. DO NOT EDIT.', ' */'].join('\n')

function toComponentName(filename) {
  const nameWithoutExt = filename.replace(/\.svg$/i, '')

  return nameWithoutExt
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

function normalizeFillAttributes(svg) {
  return svg.replace(/fill="(?!none\b)[^"]*"/gi, 'fill="currentColor"')
}

function extractViewBox(svg) {
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i)
  return viewBoxMatch ? viewBoxMatch[1] : null
}

async function ensureIconDirectories() {
  await mkdir(RAW_DIR, { recursive: true })
}

async function ensureCleanComponentsDir() {
  await rm(COMPONENT_DIR, { recursive: true, force: true })
  await mkdir(COMPONENT_DIR, { recursive: true })
}

async function readSvgFiles(dir) {
  return (await readdir(dir)).filter((file) => file.endsWith('.svg')).sort()
}

async function generateIconComponent(file, options) {
  const componentName = toComponentName(file)
  const svgPath = join(options.dir, file)

  const svgRaw = await readFile(svgPath, 'utf-8')
  const viewBox = extractViewBox(svgRaw)
  const inputSvg = options.normalizeFill ? normalizeFillAttributes(svgRaw) : svgRaw

  const jsCode = await transform(
    inputSvg,
    {
      typescript: true,
      jsxRuntime: 'automatic',
      expandProps: 'end',
      prettier: false,
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgo: true,
    },
    { componentName },
  )

  let finalCode = jsCode
  if (viewBox && !jsCode.includes('viewBox')) {
    finalCode = jsCode.replace(/<svg\s+([^>]*)>/, `<svg $1 viewBox="${viewBox}">`)
  }

  const pretty = await format(finalCode, {
    parser: 'babel-ts',
  })

  const withImportSpacing = pretty.replace(
    /(import\s+type\s+\{[^}]+\}\s+from\s+'react'\n)(?!\n)/,
    '$1\n',
  )

  const finalOutput = `${HEADER_COMMENT}\n\n${withImportSpacing}`
  const outputPath = join(COMPONENT_DIR, `${componentName}.tsx`)

  await writeFile(outputPath, finalOutput, 'utf-8')

  return { file, componentName }
}

async function generateIndexFile(icons) {
  const imports = `import type { SVGProps } from 'react'`
  const iconType = `export type IconProps = SVGProps<SVGSVGElement>`

  const exportLines = icons
    .map((icon) => icon.componentName)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `export { default as ${name} } from './components/${name}'`)
    .join('\n')

  const sections = [HEADER_COMMENT, imports, iconType]
  if (exportLines) {
    sections.push(exportLines)
  }

  await writeFile(INDEX_FILE, `${sections.join('\n\n')}\n`, 'utf-8')
}

async function main() {
  try {
    await ensureIconDirectories()

    const svgFiles = await readSvgFiles(RAW_DIR)

    await ensureCleanComponentsDir()

    const icons = await Promise.all(
      svgFiles.map((file) =>
        generateIconComponent(file, {
          dir: RAW_DIR,
          normalizeFill: true,
        }),
      ),
    )

    await generateIndexFile(icons)

    console.info('Generated icon components successfully.')
  } catch (error) {
    console.error('Failed to generate icon components.')
    console.error(error)
    process.exit(1)
  }
}

await main()
