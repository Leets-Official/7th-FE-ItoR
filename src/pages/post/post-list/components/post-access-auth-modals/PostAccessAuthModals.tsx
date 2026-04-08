import { Button, Modal, TextField } from '@shared/ui';

function CloseIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path d='M6 6 18 18M18 6 6 18' stroke='currentColor' strokeLinecap='round' strokeWidth='2' />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg fill='currentColor' viewBox='0 0 24 24'>
      <path d='M12 4c-4.97 0-9 3.13-9 7 0 2.5 1.69 4.7 4.24 5.94L6.3 20l3.57-2.37c.69.1 1.4.16 2.13.16 4.97 0 9-3.13 9-7s-4.03-7-9-7Z' />
    </svg>
  );
}

type PostAccessAuthModalsProps = {
  confirmOpen: boolean;
  authOpen: boolean;
  onConfirmOpenChange: (open: boolean) => void;
  onAuthOpenChange: (open: boolean) => void;
  onProceedSignup: () => void;
};

export default function PostAccessAuthModals({
  confirmOpen,
  authOpen,
  onConfirmOpenChange,
  onAuthOpenChange,
  onProceedSignup,
}: PostAccessAuthModalsProps) {
  return (
    <>
      <Modal.Root open={confirmOpen} onOpenChange={onConfirmOpenChange}>
        <Modal.Portal>
          <Modal.Overlay className='bg-black/20 backdrop-blur-[0.4rem]' />
          <Modal.Content className='mx-auto max-w-[53.2rem] rounded-[1rem] px-[4rem] py-[3.8rem] shadow-[0_2rem_6rem_rgba(15,23,42,0.12)]'>
            <Modal.Header className='block'>
              <Modal.Title className='text-[2rem] leading-[1.4] font-semibold text-[#111111]'>
                가입되지 않은 계정이에요.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='mt-[1.4rem] text-[1.7rem] leading-[1.5] text-[#9b9b9b]'>
              회원가입을 진행할까요?
            </Modal.Body>
            <Modal.Footer className='mt-[3.2rem] gap-[1.6rem]'>
              <Button
                className='flex-1'
                onClick={() => onConfirmOpenChange(false)}
                variant='outline'
              >
                취소
              </Button>
              <Button
                className='flex-1 border-[#1295ff] bg-[#1295ff] text-white hover:bg-[#0f87e6]'
                onClick={onProceedSignup}
              >
                회원가입 하기
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>

      <Modal.Root open={authOpen} onOpenChange={onAuthOpenChange}>
        <Modal.Portal>
          <Modal.Overlay className='bg-black/18 backdrop-blur-[0.3rem]' />
          <Modal.Content className='mx-auto max-w-[119rem] rounded-[2rem] bg-[#151515] p-0 text-white shadow-[0_3rem_8rem_rgba(0,0,0,0.28)]'>
            <div className='relative grid min-h-[54rem] overflow-hidden rounded-[2rem] md:grid-cols-[1.05fr_0.95fr]'>
              <Modal.Close className='absolute top-[2.8rem] right-[2.8rem] z-10 inline-flex size-[4.8rem] items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/8'>
                <CloseIcon />
              </Modal.Close>

              <section className='flex flex-col justify-center px-[4rem] py-[5.6rem] md:px-[7.2rem]'>
                <div className='text-[7.2rem] leading-none font-semibold tracking-[-0.08em] text-white italic md:text-[10rem]'>
                  GITLOG
                </div>
                <p className='mt-[12rem] text-[2rem] leading-[1.5] text-white/45'>
                  You can make anything by writing
                </p>
              </section>

              <section className='flex items-center px-[2.4rem] pb-[4rem] md:px-[6rem] md:py-[5.6rem]'>
                <div className='w-full'>
                  <div className='space-y-[1.2rem]'>
                    <TextField
                      className='[&_input]:h-[7rem] [&_input]:rounded-[0.8rem] [&_input]:border-none [&_input]:bg-white [&_input]:px-[2.4rem] [&_input]:text-[1.8rem]'
                      name='email'
                      placeholder='이메일'
                    />
                    <TextField
                      className='[&_input]:h-[7rem] [&_input]:rounded-[0.8rem] [&_input]:border-none [&_input]:bg-white [&_input]:px-[2.4rem] [&_input]:text-[1.8rem]'
                      name='password'
                      placeholder='비밀번호'
                      type='password'
                    />
                  </div>

                  <Button className='mt-[1.6rem] h-[7rem] w-full rounded-[0.8rem] bg-[#1295ff] text-[2rem] text-white hover:bg-[#0f87e6]'>
                    이메일로 로그인
                  </Button>

                  <div className='mt-[2.4rem] flex items-center gap-[1.6rem]'>
                    <div className='h-px flex-1 bg-white/14' />
                    <span className='text-[1.6rem] text-white/48'>SNS</span>
                    <div className='h-px flex-1 bg-white/14' />
                  </div>

                  <Button
                    className='mt-[2.4rem] h-[7rem] w-full rounded-[0.8rem] bg-[#fee500] text-[2rem] text-[#191600] hover:bg-[#f4dc00]'
                    startIcon={<KakaoIcon />}
                  >
                    카카오로 로그인
                  </Button>

                  <button
                    className='mt-[2rem] block w-full text-center text-[1.8rem] text-white/52 underline underline-offset-4'
                    type='button'
                  >
                    또는 회원가입
                  </button>
                </div>
              </section>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    </>
  );
}
