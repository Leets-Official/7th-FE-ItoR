import { KakaoIcon } from "@/assets/icons";
import * as styles from "./Signup.styled";
import { API_BASE_URL } from "@/api/config";

interface SignupSectionProps {
  onSelect: (type: "email") => void;
}

const SignupSection: React.FC<SignupSectionProps> = ({ onSelect }) => {
  const handleEmailSignup = () => onSelect("email");

  const handleKakaoSignup = () => {
    window.location.href = `${API_BASE_URL}/auth/kakao`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <h1 className={styles.logo}>GITLOG</h1>
        <p className={styles.subtitle}>You can make anything by writing</p>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.emailButton} onClick={handleEmailSignup}>
          이메일로 회원가입
        </button>

        <p className={styles.divider}>또는</p>

        <button className={styles.kakaoButton} onClick={handleKakaoSignup}>
          <KakaoIcon className="h-5 w-5" />
          카카오로 회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupSection;
