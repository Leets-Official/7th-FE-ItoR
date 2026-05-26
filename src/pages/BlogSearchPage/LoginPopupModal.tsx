import { ClearIcon, GitlogLogoIcon, KakaoIcon } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import { Divider } from '@/components/common/Divider';
import { TextField } from '@/components/common/TextField';
import { useLoginPopup } from './useLoginPopup';

interface LoginPopupModalProps {
  onClose: () => void;
}

export function LoginPopupModal({ onClose }: LoginPopupModalProps) {
  const state = useLoginPopup();

  return (
    <div className="absolute inset-0 z-40 bg-black/30 backdrop-blur-[4px]">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative h-[675px] w-[358px] rounded-[9px] bg-dark px-0 pb-20 pt-20 md:h-[469px] md:w-[782px] md:px-4">
          <button type="button" className="absolute right-[16px] top-[16px] h-10 w-10 p-[13px]" aria-label="로그인 팝업 닫기" onClick={onClose}>
            <ClearIcon className="h-[14px] w-[14px] [&_path]:fill-white" />
          </button>
          <div className="flex h-[515px] flex-col items-center md:h-[309px] md:flex-row md:justify-between md:gap-[18px]">
            <div className="flex h-[206px] w-[358px] flex-col items-center justify-center md:w-[391px]"><GitlogLogoIcon className="h-auto w-[280px] [&_path]:fill-white md:w-[308px]" /><p className="mt-6 px-4 py-3 text-center text-sm font-light text-gray-56">You can make anything by writing</p></div>
            <div className="flex h-[309px] w-[358px] flex-col items-center gap-[2px] px-4 md:w-[391px]">
              <div className="flex w-[326px] flex-col gap-[8px] px-4 py-1 md:w-[344px]">
                <TextField size={14} state="default" className="w-[294px] border-[#E6E6E6] bg-white text-black md:w-[312px]" placeholder="이메일" value={state.email} onChange={(event) => state.setEmail(event.target.value)} />
                <TextField size={14} state="default" className="w-[294px] border-[#E6E6E6] bg-white text-black md:w-[312px]" placeholder="비밀번호" type="password" value={state.password} onChange={(event) => state.setPassword(event.target.value)} />
              </div>
              <div className="w-[326px] px-4 py-1 md:w-[344px]">
                {state.loginError ? <p className="mb-2 text-xs font-light text-warning">{state.loginError}</p> : null}
                <Button size="regular" showIcon={false} className="h-[45px] w-[294px] rounded-[6px] border-transparent bg-primary text-white md:w-[312px]" onClick={state.handleEmailLogin}>이메일로 로그인</Button>
              </div>
              <div className="flex w-[295px] items-center gap-2 px-2 py-1 md:w-[313px]"><Divider color="gray90" className="w-auto flex-1 bg-gray-33" /><span className="text-xs text-gray-56">SNS</span><Divider color="gray90" className="w-auto flex-1 bg-gray-33" /></div>
              <div className="w-[326px] px-4 py-1 md:w-[344px]"><Button size="regular" showIcon icon={<KakaoIcon aria-hidden="true" />} className="h-[45px] w-[294px] rounded-[6px] border-transparent bg-[#FEE500] text-black md:w-[312px] [&_svg]:h-[17px] [&_svg]:w-[18px]" onClick={state.handleKakaoLogin}>카카오로 로그인</Button></div>
              <div className="flex justify-center py-1"><Button size="text" intent="gray" showIcon={false} className="h-[25px] px-2 py-[2px] text-xs text-gray-56 hover:bg-transparent" onClick={() => state.navigate('/signup/email')}>또는 회원가입</Button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
