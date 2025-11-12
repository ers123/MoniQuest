# MoniQuest

## Overview · 개요
**English**  
MoniQuest is a Progressive Web App that turns economics vocabulary into an adventurous quiz for kids. Learners unlock chapters, receive randomized prompts, and get warm AI-powered explanations generated with Google's Gemini Flash model—even when they miss an answer. The app ships with installable PWA metadata, offline caching, and social preview assets so it feels native on desktop and mobile.

**한국어**  
MoniQuest는 어린이들이 경제 용어를 모험처럼 익힐 수 있도록 만든 퀴즈 기반 PWA입니다. 사용자는 챕터를 차례대로 열어가며 랜덤한 문제와 격려 메시지를 만나고, 틀린 문제는 구글 Gemini Flash 모델이 생성한 다정한 설명으로 다시 학습할 수 있습니다. 설치형 PWA 메타데이터와 오프라인 캐싱, 공유용 미리보기 이미지가 포함되어 데스크톱과 모바일 모두에서 자연스러운 사용성을 제공합니다.

## Key Features · 주요 기능
**English**
- Installable PWA with `manifest.json`, service worker caching, and an offline fallback page.
- AI coaching powered by the budget-friendly Gemini 2.5 Flash Lite streaming API for explanations and chat.
- Randomized quiz order, answer options, and feedback tone to keep each playthrough fresh.
- Local progress tracking with confetti celebrations when learners master a chapter.

**한국어**
- `manifest.json`, 서비스 워커 캐싱, 오프라인 대체 페이지를 갖춘 설치형 PWA 지원.
- 저비용 Gemini 2.5 Flash Lite 스트리밍 API로 제공되는 AI 선생님의 해설과 대화.
- 매번 다른 순서와 피드백으로 진행되는 퀴즈와 답변 옵션으로 반복감을 줄임.
- 챕터 완수 시 로컬 진척도 저장과 폭죽 애니메이션으로 성취감을 강화.

## Getting Started · 시작하기
**Prerequisites · 사전 준비**
- [Node.js](https://nodejs.org/) 18 이상 / version 18 or newer
- Google AI Studio API key with Gemini access

**Environment variables & secrets · 환경 변수와 비밀 관리**
**English**
- Create a `.env.local` file and set `VITE_GOOGLE_API_KEY` for local runs. Use the private key that was shared with you (or mint a new restricted key), but never commit the actual value.
- Copy `public/config.template.json` to `public/config.json` during deployment and replace the placeholder with a **restricted** key (e.g., limit HTTP referrers to `https://ers123.github.io/MoniQuest/*`). The real file is ignored by git so secrets stay out of version control. Local `npm run dev`, `npm run build`, and `npm run preview` automatically create the file from the template, so you only need to provide the secret when you have one.
- The production build already defaults to the GitHub Pages path `/MoniQuest/`. Only set `VITE_BASE_PATH` if you deploy under a different subdirectory (for example, a custom domain or staging folder).

**한국어**
- 로컬 실행 시 `.env.local` 파일에 `VITE_GOOGLE_API_KEY`를 설정하세요. 전달받은 비공개 키(또는 새로 발급한 제한 키)를 사용하되 실제 값을 커밋하지 마세요.
- 배포 전에 `public/config.template.json`을 `public/config.json`으로 복사한 뒤 자리 표시자를 **제한된** 키(예: `https://ers123.github.io/MoniQuest/*` HTTP referrer 한정)로 교체하세요. 실제 파일은 git에 무시되므로 비밀이 저장소에 노출되지 않습니다. 로컬에서는 `npm run dev`, `npm run build`, `npm run preview` 명령이 템플릿을 기반으로 자동 생성하므로, 실제 비밀 값이 있을 때만 교체하면 됩니다.
- 프로덕션 빌드는 기본적으로 GitHub Pages 경로인 `/MoniQuest/`를 사용합니다. 다른 하위 경로나 도메인에 배포할 때만 `VITE_BASE_PATH`를 설정하세요.

```bash
# .env.local (local-only)
VITE_GOOGLE_API_KEY=YOUR_RESTRICTED_GEMINI_KEY

# GitHub Action secret example (override only when needed)
# VITE_BASE_PATH=/custom-subdir/
```

**Installation · 설치**
```bash
npm install
```

**Local development · 로컬 개발 실행**
```bash
npm run dev
```
Then open the printed URL (defaults to <http://localhost:5173>). The service worker automatically updates when you reload after a code change.

**Building for production · 프로덕션 빌드**
```bash
npm run build
```
The build output lives in `dist/`. Serve it with any static host that supports service workers.

## Deploying to GitHub Pages · GitHub Pages 배포
**English**
1. Store `VITE_GOOGLE_API_KEY` as a GitHub Action secret. The build already targets `/MoniQuest/`, so only add `VITE_BASE_PATH` if you need a different subdirectory.
2. Restrict the Google API key to `https://ers123.github.io/MoniQuest/*` (HTTP referrers) inside Google Cloud Console so the leaked key is useless elsewhere.
3. The included workflow at [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) handles `npm ci`, copies `public/config.template.json` to `public/config.json`, injects the secret key, and publishes the Vite `dist/` output via `actions/deploy-pages`.
4. After deployment, open <https://ers123.github.io/MoniQuest/> to confirm the service worker registers and the install prompt appears.

**한국어**
1. GitHub Actions 시크릿에 `VITE_GOOGLE_API_KEY`만 저장하면 됩니다. 빌드는 기본적으로 `/MoniQuest/` 경로를 대상으로 하므로 다른 하위 경로가 필요할 때만 `VITE_BASE_PATH`를 추가하세요.
2. Google Cloud Console에서 API 키를 `https://ers123.github.io/MoniQuest/*` HTTP referrer로 제한해 유출되더라도 다른 곳에서 사용할 수 없게 하세요.
3. [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) 워크플로가 `npm ci` 실행 후 `public/config.template.json`을 복사하여 비밀 키를 주입하고, `actions/deploy-pages`로 Vite `dist/` 결과를 게시합니다.
4. 배포가 끝나면 <https://ers123.github.io/MoniQuest/> 에 접속하여 서비스 워커 등록과 설치 배너를 확인하세요.

### Deployment checklist & troubleshooting · 배포 체크리스트와 점검

**English**
- ✅ **What is GitHub Pages serving?** Confirm the latest Actions run for “Deploy MoniQuest to GitHub Pages” is green and points at the `https://ers123.github.io/MoniQuest/` URL.
- ✅ **Correct base path?** Ensure `vite.config.ts` keeps `base` at `/MoniQuest/` (or override with `VITE_BASE_PATH`) so static assets resolve in production.
- ✅ **Runtime config present?** The workflow (and local npm scripts) copy `public/config.template.json` to `public/config.json`. Update the secret if you rotate keys, or provide the file manually only when deploying from another CI/CD tool.
- ✅ **Artifact upload?** The workflow’s `actions/upload-pages-artifact` step must report success so `dist/` is actually published.
- ✅ **Cache refresh?** After redeploying, bump `CACHE_VERSION` in `public/sw.js` and clear browser storage (DevTools ▸ Application ▸ Clear site data) to avoid stale blank caches.

**한국어**
- ✅ **Pages에서 무엇을 배포하나요?** “Deploy MoniQuest to GitHub Pages” 작업이 성공(Success) 상태인지 확인하고, 링크가 `https://ers123.github.io/MoniQuest/`를 가리키는지 점검하세요.
- ✅ **Vite base 경로는?** 프로덕션에서 정적 자산을 불러오려면 `vite.config.ts`의 `base`가 `/MoniQuest/`인지(또는 `VITE_BASE_PATH`로 덮어쓰는지) 확인하세요.
- ✅ **런타임 설정 파일 존재 여부** 워크플로와 로컬 npm 스크립트가 `public/config.template.json`을 `public/config.json`으로 복사합니다. 키를 교체했다면 시크릿을 업데이트하고, 다른 CI/CD에서 배포할 때만 수동으로 파일을 준비하세요.
- ✅ **산출물 업로드** `actions/upload-pages-artifact` 단계가 성공해야 `dist/`가 실제로 배포됩니다.
- ✅ **서비스 워커 캐시 초기화** 새 버전을 배포했다면 `public/sw.js`의 `CACHE_VERSION`을 올리고 브라우저 저장소(개발자 도구 ▸ Application ▸ Clear site data)를 비운 뒤 강력 새로고침 하세요.

## Security · 보안 안내
**English**
- Review the [Security Policy](./.github/SECURITY.md) for how to report vulnerabilities and keep the Gemini key restricted to GitHub Pages origins.
- Store your Gemini API key only in local `.env.local` files or runtime `public/config.json` copies that are never committed. Rotate it immediately if exposure is suspected.

**한국어**
- 취약점 제보 방법과 GitHub Pages 도메인에 한정된 Gemini 키 관리 절차는 [보안 정책](./.github/SECURITY.md)을 참고하세요.
- Gemini API 키는 로컬 `.env.local` 파일이나 배포 시 생성되는 `public/config.json`에만 보관하고, 저장소에 커밋하지 마세요. 유출이 의심되면 즉시 키를 교체하세요.

## Testing & Quality Checks · 테스트 및 품질 확인
Run the Vite preview build locally to verify PWA behavior and offline mode:
```bash
npm run build
npm run preview
```
While previewing, try toggling the network tab to **Offline** in your browser dev tools to confirm `offline.html` appears.

## Project Structure · 프로젝트 구조
```
├── App.tsx                 # Global layout, routing, and app context
├── components/             # Quiz UI, animations, and reusable widgets
├── services/geminiService.ts # Gemini Flash streaming helpers for quizzes & chat
├── public/
│   ├── manifest.json       # PWA manifest referencing app & shortcut icons
│   ├── sw.js               # Service worker with versioned caching & offline fallback
│   ├── 404.html            # Redirect helper so GitHub Pages history routes stay alive
│   ├── offline.html        # Friendly offline message surfaced when network fails
│   ├── moni_icon.png       # PWA install icon
│   └── moni_image.png      # Open Graph / social preview image
├── scripts/
│   └── prepare-config.mjs  # Copies config template and injects optional API secrets
├── index.html              # HTML shell with Open Graph & Twitter metadata
├── index.tsx               # Entry point that mounts the React app & registers SW
└── README.md               # This guide (English & Korean)
```

## PWA Tips · PWA 사용 팁
**English**
- Add the app to your home screen from Chrome, Edge, or Safari to experience the standalone layout.
- When shipping updates, bump the `CACHE_VERSION` constant in `public/sw.js` so returning users receive the newest assets immediately.
- Customize the Open Graph title and description in `index.html` to match upcoming campaigns or learning themes.

**한국어**
- Chrome, Edge, Safari에서 홈 화면에 추가하면 전체 화면 모드로 학습 앱을 사용할 수 있습니다.
- 새 버전을 배포할 때는 `public/sw.js`의 `CACHE_VERSION` 값을 높여 기존 사용자가 최신 자산을 곧바로 받도록 하세요.
- 캠페인이나 학습 테마에 맞춰 `index.html`의 오픈그래프 제목과 설명을 수정하면 공유 시 더 눈에 띕니다.

즐거운 경제 모험 되세요! ✨
