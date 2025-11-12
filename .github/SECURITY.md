# Security Policy · 보안 정책

## Supported Versions · 지원 버전
We support security fixes on the active `main` branch and the deployed GitHub Pages site at
[`https://ers123.github.io/MoniQuest/`](https://ers123.github.io/MoniQuest/).

현재는 `main` 브랜치와 GitHub Pages 배포본(`https://ers123.github.io/MoniQuest/`)에 대해서만 보안 수정이 제공됩니다.

## Reporting a Vulnerability · 취약점 제보
- **English**
  - Email: <security@moniquest.app>
  - Include steps to reproduce, expected vs. actual behavior, and any logs or screenshots that help explain the impact.
  - Do not open public issues for security problems. We will acknowledge valid reports within 3 business days and aim to ship fixes within 14 days.
- **한국어**
  - 이메일: <security@moniquest.app>
  - 재현 방법, 기대 동작과 실제 동작, 영향도를 설명할 수 있는 로그 또는 스크린샷을 함께 보내주세요.
  - 보안 관련 이슈는 공개 이슈로 등록하지 말고 이메일로 제보해주세요. 영업일 기준 3일 이내에 접수 회신을 드리고, 14일 이내 패치를 목표로 합니다.

## Protecting the Gemini API Key · Gemini API 키 보호 지침
- Restrict the key in Google Cloud Console to the production origin `https://ers123.github.io/MoniQuest/*` and any custom domains you operate.
- Rotate the key immediately if you suspect exposure. Update both your GitHub Actions secrets and `public/config.json` runtime file.
- Never commit real keys to the repository; the `.env.local` file and `public/config.json` are ignored by git.

- Google Cloud Console에서 API 키를 `https://ers123.github.io/MoniQuest/*` 및 운영 중인 커스텀 도메인으로 제한하세요.
- 키가 유출되었다고 의심되면 즉시 교체하고 GitHub Actions 시크릿과 배포용 `public/config.json` 값을 모두 업데이트하세요.
- 실제 키는 절대 저장소에 커밋하지 마세요. `.env.local`과 `public/config.json`은 git에서 제외되어 있습니다.

## Coordinated Disclosure · 책임 있는 공개
We appreciate a short embargo (at least 7 days) before you disclose a vulnerability publicly so we can ship patches and notify users.

취약점을 공개하기 전 최소 7일의 보류 기간을 두어 패치를 배포하고 사용자에게 안내할 수 있도록 협조 부탁드립니다.
