# 찐맛집 — Product Requirements Document v2.0
### v0 디자인 가이드라인 반영본

**버전:** v2.0  
**작성일:** 2026-04-03  
**Tech Stack:** Next.js 14+ (App Router) + TypeScript + Zod  
**디자인 툴:** v0 by Vercel

---

## 1. 누구를 타겟으로 할 것인가 (유저층)

### 1.1 Primary Target (동등 비중)

**① 20~30대 MZ세대**
- 맛집 정보를 인스타그램·유튜브 숏폼에서 주로 수집
- '찐맛집'이라는 검증된 큐레이션 브랜드에 신뢰를 두는 세대
- 트렌디하고 힙한 UI/UX에 민감하게 반응, 다크모드 선호도 높음
- 지인에게 공유하는 소셜 행동 패턴이 강함

**② 음식 마니아 / 푸디**
- 햄버거·돈가스 등 장르별로 깊이 파고드는 전문 탐방 유저
- 단순 검색이 아닌 '큐레이션의 퀄리티'에 반응
- 리뷰를 꼼꼼히 작성하고 다른 유저 리뷰도 적극 참고
- 새로운 스팟 발굴에 높은 동기 부여

### 1.2 Secondary Target
- **여행자 / 관광객** — 지역별 탐색으로 낯선 도시에서도 신뢰할 수 있는 맛집 발견

### 1.3 유저 페르소나

| 구분 | 페르소나 A | 페르소나 B |
|------|-----------|-----------|
| 이름 | 김지원 (26세, 디자이너) | 박세훈 (31세, 푸디 직장인) |
| 상황 | 퇴근 후 친구와 즉흥 약속 | 주말 햄버거 원정대 계획 중 |
| Pain point | 수백 개 맛집 중 '진짜' 좋은 곳 고르기 어렵다 | 스매시버거 전문점이 어디에 있는지 흩어진 정보를 모으기 힘들다 |
| 니즈 | 지금 내 위치 기준 빠른 AI 추천 | 장르별 큐레이션 + 디테일한 리뷰 |

---

## 2. 무엇을 만들 것인가

### 2.1 제품 한 줄 정의
> **"엄선된 맛집 큐레이션 + AI 챗봇이 결합된 개인화 맛집 추천 서비스"**

### 2.2 핵심 콘셉트
- 믿을 수 있는 네이버 지도 큐레이션 폴더(음식별 4개 + 지역별 5개)를 데이터 소스로 사용
- AI(Gemini Flash 3.0)가 유저의 자연어 요청 + 현재 위치를 분석해 최적의 스팟 추천
- 방문한 유저가 남기는 리뷰로 커뮤니티 신뢰도를 누적

### 2.3 제품 범위 (In-Scope / Out-of-Scope)

**In-Scope**
- 음식별 / 지역별 탐색 모드 선택 UI
- Gemini 챗봇 기반 자연어 추천
- 네이버 지도 임베드 + 위치 기반 마커
- 유저 리뷰 (별점 + 텍스트 + 사진 + 태그)
- 소셜 로그인 (카카오 / 구글)

**Out-of-Scope (v1)**
- 예약 / 주문 연동
- 맛집 제보 / 제안 기능
- 푸시 알림

---

## 3. 디바이스 사이즈

### 3.1 전략: **완전 반응형 (Mobile & Desktop 동등 비중)**
모바일과 웹 데스크탑 모두 1순위로 설계한다. 모바일은 즉흥적인 외출 중 사용, 데스크탑은 미리 여행·외식을 계획하는 시나리오로 두 환경 모두 핵심 UX를 완전히 충족해야 한다.

### 3.2 브레이크포인트 (Tailwind 기준)

| 이름 | 크기 | 설명 |
|------|------|------|
| `sm` | 375px | iPhone SE / 기본 모바일 (디자인 기준점) |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 노트북 |
| `xl` | 1280px | 데스크탑 |

### 3.3 레이아웃 전략
- **모바일**: 풀스크린 단일 컬럼, 하단 고정 챗봇 입력창, 지도는 상단 절반 차지
- **태블릿**: 지도(좌 60%) + 챗봇 패널(우 40%) 스플릿 레이아웃
- **데스크탑**: 사이드바 네비게이션 + 콘텐츠 + 지도 3단 구성

---

## 4. 주요 기능 사항

### Feature 1. 탐색 모드 선택
- 홈 화면에서 **[🍔 음식별로 찾기]** / **[📍 지역별로 찾기]** 두 개의 메인 CTA 버튼
- 음식별 선택 시: 햄버거 / 돈가스 / 빵 / 디저트·카페 카테고리 카드
- 지역별 선택 시: 서울 / 수도권 / 강원·충청 / 경상·전라 / 제주 지역 카드

```typescript
// Zod 스키마
const ModeSchema = z.enum(['food', 'region']);
const FoodCategorySchema = z.enum(['burger', 'donkatsu', 'bread', 'dessert_cafe']);
const RegionSchema = z.enum(['seoul', 'metropolitan', 'gangwon_chungcheong', 'gyeongsang_jeolla', 'jeju']);
```

### Feature 2. AI 챗봇 추천 (Gemini Flash 3.0)
- 모드 선택 후 자연어 입력창 활성화
- 유저 위치(GPS) + 선택 카테고리 + 큐레이션 스팟 목록을 컨텍스트로 Gemini에 전달
- 응답: 추천 스팟 1~3개 + 추천 이유 + 지도 위 마커 강조
- 위치 거부 시 → 지역명 텍스트 입력 폴백

```typescript
const ChatRequestSchema = z.object({
  mode: ModeSchema,
  category: z.union([FoodCategorySchema, RegionSchema]),
  userMessage: z.string().min(1).max(500),
  userLat: z.number().optional(),
  userLng: z.number().optional(),
});
```

### Feature 3. 네이버 지도 연동
- 선택된 큐레이션 폴더 스팟을 지도 위에 핀으로 표시
- 내 위치 실시간 마커 (파란 점)
- AI 추천 스팟 강조 마커 (주황 핀)
- 마커 탭 → 스팟 미리보기 바텀시트(모바일) / 사이드 카드(데스크탑)

### Feature 4. 유저 리뷰
- 스팟별 리뷰 작성 (로그인 필수, 스팟당 1인 1리뷰)
- 구성: ⭐ 별점 (1~5) + 📝 텍스트 (10~500자) + 📸 사진 (최대 3장) + 🏷 태그
- 태그 예시: `#혼밥가능` `#웨이팅있음` `#뷰맛집` `#가성비` `#데이트`
- 리뷰 신고 기능 포함

```typescript
const ReviewCreateSchema = z.object({
  spotId: z.string(),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(10).max(500),
  tags: z.array(z.string()).max(5),
  imageUrls: z.array(z.string().url()).max(3).optional(),
});
```

### Feature 5. 소셜 로그인
- 카카오 로그인 (Primary — 국내 타겟 특성상 1순위)
- 구글 로그인 (Secondary)
- NextAuth.js 기반

---

## 5. 디자인 스타일과 톤

### 5.1 핵심 방향
> **"힙하고 트렌디한 다크모드 퍼스트 — 강렬한 색감으로 식욕과 감각을 동시에 자극"**

어두운 배경 위에 강렬한 포인트 컬러와 고퀄리티 푸드 사진이 충돌하며 만들어내는 '힙한 맛집 바이브'. 인스타그램·틱톡 감성에 익숙한 MZ·푸디 유저에게 즉각적인 비주얼 임팩트를 준다.

### 5.2 컬러 팔레트 (다크모드 기준)

| 역할 | 색상 | 용도 |
|------|------|------|
| Background | `#0D0D0D` (딥 블랙) | 전체 배경 |
| Surface | `#1A1A1A` (다크 그레이) | 카드, 모달, 입력창 배경 |
| Primary | `#FF3B1F` (버닝 레드-오렌지) | CTA 버튼, 추천 마커, 브랜드 강조 |
| Accent | `#FFD600` (일렉트릭 옐로우) | 별점, 뱃지, 하이라이트 포인트 |
| Text Primary | `#F5F5F5` | 주요 텍스트 |
| Text Muted | `#6B6B6B` | 서브텍스트, 비활성 요소 |
| Border | `#2C2C2C` | 구분선, 카드 테두리 |

> 라이트모드는 지원하되 다크모드가 기본값(default: dark).

### 5.3 타이포그래피

| 구분 | 폰트 | 설명 |
|------|------|------|
| 한국어 | Pretendard | 가독성과 세련미를 동시에 갖춘 국내 표준 폰트 |
| 숫자/영문 | Space Grotesk | 모던하고 개성 있는 기하학적 산세리프 |
| 브랜드 워드마크 | Pretendard ExtraBold 800 | '찐맛집' 로고 타이틀 |

**크기 스케일**
- H1: 28px / ExtraBold (히어로 타이틀)
- H2: 22px / Bold
- Body: 15px / Regular
- Caption: 12px / Medium

### 5.4 컴포넌트 스타일

| 컴포넌트 | 스타일 |
|----------|--------|
| 버튼 (Primary) | `#FF3B1F` 배경, radius-full, 대문자 Bold 레이블, hover 시 밝기 +10% |
| 버튼 (Ghost) | 테두리 1px `#FF3B1F`, 투명 배경, 텍스트 `#FF3B1F` |
| 카드 | `#1A1A1A` 배경, radius-2xl, border `#2C2C2C`, 푸드 이미지 ratio 16:9 |
| 챗봇 입력창 | 하단 고정, `#1A1A1A` + `backdrop-blur-lg`, 전송 버튼 `#FF3B1F` |
| 바텀시트 | `#1A1A1A` 배경, 상단 핸들 `#3A3A3A`, spring 슬라이드업 애니메이션 |
| 마커 | 커스텀 SVG 핀 (`#FF3B1F` + 흰 아이콘), 추천 마커는 `#FFD600` 글로우 이펙트 |
| 태그/뱃지 | `#2C2C2C` 배경, `#FFD600` 텍스트, radius-full |

### 5.5 톤 & 보이스
- **힙하고 직접적**: "오늘 뭐 먹지? AI한테 물어봐." 같은 짧고 강렬한 카피
- **감각을 자극하는 언어**: "바삭하고 육즙 터지는", "한 입에 무너지는" 같은 표현
- **큐레이터의 자신감**: "검증된 스팟만", "여기는 진짜야" 뉘앙스
- **이모지 절제 사용**: 과하지 않게, 포인트로만

### 5.6 인터랙션 원칙
- **다크모드 기본** — `prefers-color-scheme: dark` 자동 감지, 수동 토글 제공
- 챗봇 응답은 **스트리밍 타이핑 효과** (Gemini streaming API)
- 지도 마커 탭 → 스팟 카드 **슬라이드업 (모바일) / 오른쪽 패널 페이드인 (데스크탑)**
- 카드 hover 시 **scale-up + 오렌지 테두리 글로우** 이펙트
- 스켈레톤 로딩 — 다크 배경 기준 shimmer 애니메이션

---

## 6. 페이지 구조 (v0 컴포넌트 설계 기준)

```
/                          → 홈 — 모드 선택 CTA + 히어로 이미지
/explore/food/[category]   → 음식별 탐색 — 지도 + 챗봇 입력
/explore/region/[area]     → 지역별 탐색 — 지도 + 챗봇 입력
/spot/[spotId]             → 스팟 상세 — 사진 갤러리 + 리뷰
/spot/[spotId]/review/new  → 리뷰 작성
/profile                   → 내 리뷰 / 저장 목록
```

**공통 컴포넌트 (v0 우선 생성 대상)**
- `<NavBar />` — 상단 고정, 뒤로가기 + 로고 + 검색 아이콘
- `<ModeSelector />` — 음식별/지역별 선택 버튼 그룹
- `<CategoryCard />` — 카테고리/지역 선택 카드
- `<ChatInput />` — 하단 고정 챗봇 입력창
- `<SpotCard />` — 스팟 미리보기 카드
- `<ReviewCard />` — 리뷰 표시 카드
- `<BottomSheet />` — 모바일 바텀시트 래퍼

---

## 7. API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| POST | `/api/chat` | Gemini 챗봇 추천 요청 (스트리밍) |
| GET | `/api/spots` | 큐레이션 스팟 목록 조회 |
| GET | `/api/spots/[id]` | 스팟 상세 조회 |
| GET | `/api/spots/[id]/reviews` | 리뷰 목록 |
| POST | `/api/spots/[id]/reviews` | 리뷰 작성 |
| PATCH | `/api/reviews/[id]` | 리뷰 수정 |
| DELETE | `/api/reviews/[id]` | 리뷰 삭제 |

---

## 8. 환경 변수

```env
NAVER_MAP_CLIENT_ID=
NAVER_MAP_CLIENT_SECRET=
GEMINI_API_KEY=
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
```

---

## 9. 마일스톤

| 단계 | 내용 | 기간 |
|------|------|------|
| M1 | 프로젝트 세팅, v0 디자인 시스템 구축, DB 스키마 | 1주 |
| M2 | 탐색 모드 UI, 네이버 지도 임베드, 큐레이션 데이터 시딩 | 1주 |
| M3 | Gemini 챗봇 연동 + 위치 기반 추천 + 스트리밍 응답 | 1.5주 |
| M4 | 소셜 로그인 + 리뷰 시스템 | 1주 |
| M5 | QA, 반응형 검증, 성능 최적화, 배포 | 0.5주 |
