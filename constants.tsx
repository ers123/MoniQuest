import { Chapter, Term } from './types';
import { MoneyIcon, BankIcon, PriceIcon, NationIcon, InvestmentIcon, CompanyIcon, TradeIcon, GovernmentIcon, PsychologyIcon, CrisisIcon, ToolsIcon, FutureIcon } from './components/icons';

export const CHAPTER_DATA: Chapter[] = ([
  {
    id: 1,
    title: "돈의 탄생",
    theme: "The Birth of Money",
    status: 'unlocked',
    icon: (className) => <MoneyIcon className={className} />,
    secondary_terms: ["화폐", "금속화폐", "신용화폐", "통화량", "교환가치", "물물교환", "화폐기능", "본원통화", "시뇨리지", "통화승수"],
    terms: [
       {
        term: "금본위제", term_english: "Gold Standard", chapter: 1, theme: "돈의 탄생",
        simple_definition: "화폐의 가치를 금 보유량에 연동하던 통화제도.",
        kid_friendly_explanation: "돈의 가치를 금에 묶어두는 규칙이야. 금이 많아야 돈도 많이 만들 수 있었어.",
        example_story: "옛날 왕국에서는 금 창고에 있는 금만큼만 돈을 만들 수 있었대.",
        quiz_question: "'금본위제'에서는 금이 없어도 돈을 마음대로 많이 만들 수 있을까?",
        quiz_options: ["아니, 금이 있어야만 만들 수 있어.", "응, 금 대신 은이 있으면 괜찮아.", "응, 은행에 허락 받으면 만들 수 있어."],
        quiz_answer: "아니, 금이 있어야만 만들 수 있어.",
        related_terms: "본원통화, 시뇨리지, 화폐가치", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "본원통화", term_english: "Base Money", chapter: 1, theme: "돈의 탄생",
        simple_definition: "중앙은행이 직접 공급하는 가장 기초가 되는 통화.",
        kid_friendly_explanation: "경제의 씨앗돈이야. 다른 모든 돈이 여기서부터 자라나거든.",
        example_story: "중앙은행 금고에서 나온 씨앗돈(본원통화) 덕분에 마을 은행들이 사람들에게 돈을 빌려줄 수 있게 됐어.",
        quiz_question: "본원통화는 누가 만드는 돈일까?",
        quiz_options: ["중앙은행", "동네 은행들", "정부"],
        quiz_answer: "중앙은행",
        related_terms: "중앙은행, 시뇨리지, 기준금리", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "시뇨리지", term_english: "Seigniorage", chapter: 1, theme: "돈의 탄생",
        simple_definition: "화폐 발행으로 생기는 이익 (화폐가치 - 제조비용).",
        kid_friendly_explanation: "돈을 찍을 때 드는 비용보다 돈의 가치가 더 커서 남는 이익이야. 동전 만드는 비밀 이익 같지?",
        example_story: "옛날 왕은 10원짜리 동전을 1원에 만들어서 9원의 시뇨리지 이익을 얻었대.",
        quiz_question: "500원짜리 동전을 만드는 데 100원이 들었다면, 시뇨리지는 얼마일까?",
        quiz_options: ["400원", "500원", "100원"],
        quiz_answer: "400원",
        related_terms: "화폐가치, 물가, 본원통화", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "부가가치", term_english: "Value Added (VA)", chapter: 1, theme: "돈의 탄생",
        simple_definition: "생산 과정에서 새로 더해진 가치.",
        kid_friendly_explanation: "밀가루가 빵으로 변하면서 더 맛있어지고 비싸지는 것, 그게 바로 부가가치야!",
        example_story: "빵집 아저씨는 밀가루로 맛있는 빵을 만들어 더 높은 가격에 팔아서 부가가치를 만들었어.",
        quiz_question: "나무로 멋진 의자를 만들었을 때, 새로 생긴 가치를 무엇이라고 부를까?",
        quiz_options: ["부가가치", "할인가치", "원래가치"],
        quiz_answer: "부가가치",
        related_terms: "한계비용, 조세부담률", difficulty_level: 2, reference: "KDI Dictionary"
      },
      {
        term: "한계비용", term_english: "Marginal Cost (MC)", chapter: 1, theme: "돈의 탄생",
        simple_definition: "상품을 한 단위 더 만들 때 드는 추가 비용.",
        kid_friendly_explanation: "쿠키를 하나 더 만들 때 추가로 드는 밀가루와 설탕 값이야.",
        example_story: "로봇이 장난감을 10개 만들다가 11개째를 만들 때, 추가로 들어가는 플라스틱 비용이 바로 한계비용이야.",
        quiz_question: "아이스크림 가게에서 아이스크림을 하나 더 만들 때 추가로 드는 우유와 설탕 값은 무엇일까?",
        quiz_options: ["총비용", "한계비용", "고정비용"],
        quiz_answer: "한계비용",
        related_terms: "부가가치, 가격, 공급탄력성", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "표면금리", term_english: "Coupon Rate", chapter: 1, theme: "돈의 탄생",
        simple_definition: "채권 액면에 적힌 약정 이자율.",
        kid_friendly_explanation: "채권이라는 약속 증서에 '매년 이만큼의 이자를 줄게요'라고 쓰여있는 숫자야.",
        example_story: "리아는 표면금리 3%라고 적힌 국채를 사서 매년 이자를 받기로 했어.",
        quiz_question: "채권에 '표면금리 5%'라고 쓰여 있다면, 이 채권을 산 사람은 무엇을 기대할 수 있을까?",
        quiz_options: ["매년 5%의 이자를 받는다", "채권 가격이 5% 오른다", "물가가 5% 내린다"],
        quiz_answer: "매년 5%의 이자를 받는다",
        related_terms: "만기수익률, 국채", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "평가절하", term_english: "Devaluation", chapter: 1, theme: "돈의 탄생",
        simple_definition: "정책적으로 통화가치를 낮추는 것.",
        kid_friendly_explanation: "우리나라 돈의 힘을 일부러 약하게 만들어서, 외국 사람들이 우리 물건을 더 싸게 느끼도록 하는 거야.",
        example_story: "수출을 늘리기 위해 정부는 우리 돈의 가치를 낮추는 평가절하를 결정했어.",
        quiz_question: "우리나라 돈의 가치가 '평가절하'되면 외국으로 여행 갈 때 여행 경비가 어떻게 될까?",
        quiz_options: ["더 적게 든다", "더 많이 든다", "똑같다"],
        quiz_answer: "더 많이 든다",
        related_terms: "환율, 경상수지", difficulty_level: 4, reference: "BOK Glossary"
      },
      {
        term: "화폐", term_english: "Currency", chapter: 1, theme: "돈의 탄생",
        simple_definition: "물건을 사고팔 때 사용하는 돈.",
        kid_friendly_explanation: "우리가 물건을 살 때 주는 돈이야. 옛날엔 조개껍데기나 소금도 화폐로 쓰였대!",
        example_story: "마을 사람들은 쌀로 물건을 사고팔다가, 나중에는 동전이라는 화폐를 만들어 사용하기 시작했어.",
        quiz_question: "화폐가 하는 가장 중요한 역할은 무엇일까?",
        quiz_options: ["물건을 사고팔 때 사용", "집을 꾸미는 장식품", "책갈피로 사용"],
        quiz_answer: "물건을 사고팔 때 사용",
        related_terms: "본원통화, 금속화폐, 신용화폐", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "통화량", term_english: "Money Supply", chapter: 1, theme: "돈의 탄생",
        simple_definition: "경제에서 돌아다니는 돈의 총량.",
        kid_friendly_explanation: "나라 안에서 사람들이 가지고 있는 돈 전부를 합친 양이야. 돈이 많으면 물건 가격이 오를 수 있어.",
        example_story: "중앙은행이 돈을 많이 찍어내자 통화량이 늘어났고, 빵 가격도 조금씩 올랐어.",
        quiz_question: "통화량이 갑자기 많이 늘어나면 물건 값은 어떻게 될까?",
        quiz_options: ["올라갈 가능성이 높다", "내려갈 가능성이 높다", "변하지 않는다"],
        quiz_answer: "올라갈 가능성이 높다",
        related_terms: "본원통화, 물가, 인플레이션", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "교환가치", term_english: "Exchange Value", chapter: 1, theme: "돈의 탄생",
        simple_definition: "물건이 다른 물건과 교환될 때의 가치.",
        kid_friendly_explanation: "내 장난감을 친구 장난감과 바꿀 때, 서로 얼마나 가치 있는지를 나타내는 거야.",
        example_story: "리아는 자기 인형의 교환가치가 친구 로봇보다 낮다고 생각해서 인형 2개를 제안했어.",
        quiz_question: "사과 1개와 바나나 2개를 바꿀 수 있다면, 사과의 교환가치는 바나나 몇 개일까?",
        quiz_options: ["2개", "1개", "3개"],
        quiz_answer: "2개",
        related_terms: "화폐, 물물교환, 가격", difficulty_level: 1, reference: "BOK Glossary"
      },
    ]
  },
  {
    id: 2,
    title: "은행과 금리의 마법",
    theme: "Banks and Interest Magic",
    status: 'locked',
    icon: (className) => <BankIcon className={className} />,
    secondary_terms: ["예금", "대출", "금리정책", "재할인율", "콜금리", "유동성", "지급준비율", "금융기관", "이자율", "통화정책"],
    terms: [
       {
        term: "기준금리", term_english: "Policy Rate (Base Rate)", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "중앙은행이 정하는 대표 금리.",
        kid_friendly_explanation: "나라 경제의 온도 조절기 같은 거야. 너무 추우면 온도를 높여주고(금리를 낮추고), 너무 뜨거우면 낮춰줘(금리를 높여).",
        example_story: "중앙은행이 기준금리를 내리자, 마을 사람들은 돈을 빌려 가게를 열기 시작했어.",
        quiz_question: "기준금리가 올라가면, 은행에 돈을 저축하는 사람들의 이자는 어떻게 될까?",
        quiz_options: ["올라간다", "내려간다", "상관없다"],
        quiz_answer: "올라간다",
        related_terms: "변동금리, 고정금리, 예대율", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "고정금리", term_english: "Fixed Interest Rate", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "대출/예금 기간 내 금리가 변하지 않는 형태.",
        kid_friendly_explanation: "한 번 정한 이자는 약속한 기간 동안 절대로 바뀌지 않는 규칙이야.",
        example_story: "리아의 아빠는 앞으로 이자가 오를 것 같아서, 이자가 변하지 않는 고정금리로 대출을 받았어.",
        quiz_question: "금리가 계속 내려갈 것 같을 때, 은행에 돈을 맡긴다면 어떤 금리가 더 유리할까?",
        quiz_options: ["고정금리", "변동금리", "둘 다 똑같다"],
        quiz_answer: "고정금리",
        related_terms: "변동금리, 기준금리", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "변동금리", term_english: "Floating/Variable Rate", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "시장금리에 따라 변하는 금리.",
        kid_friendly_explanation: "상황에 따라 이자가 오르락내리락 바뀌는, 파도타기 같은 금리야.",
        example_story: "시장에 돈이 많아져 기준금리가 내려가자, 리아의 변동금리 예금 이자도 조금 줄어들었어.",
        quiz_question: "금리가 오르락내리락 심하게 변할 때, 변동금리로 돈을 빌리면 어떤 점이 불안할까?",
        quiz_options: ["매달 내는 이자가 달라질 수 있다", "빌린 돈의 원금이 바뀔 수 있다", "은행이 바뀔 수 있다"],
        quiz_answer: "매달 내는 이자가 달라질 수 있다",
        related_terms: "고정금리, 기준금리", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "예대율", term_english: "Loan-to-Deposit Ratio (LDR)", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "은행의 예금액 대비 대출액 비율.",
        kid_friendly_explanation: "은행이 사람들에게 받은 돈(예금) 중에서 얼마만큼을 다른 사람들에게 빌려줬는지(대출) 보여주는 비율이야.",
        example_story: "마을 은행은 예대율을 너무 높이지 않아서, 갑자기 많은 사람이 돈을 찾으러 와도 괜찮았어.",
        quiz_question: "은행이 예금을 100원 받고 대출을 90원 해주었다면, 예대율은 몇 %일까?",
        quiz_options: ["90%", "100%", "10%"],
        quiz_answer: "90%",
        related_terms: "유동성, 중앙은행", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "만기수익률", term_english: "Yield to Maturity (YTM)", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "채권을 만기까지 보유할 때 기대되는 전체 수익률.",
        kid_friendly_explanation: "채권을 끝까지 가지고 있을 때, 매년 평균적으로 얼마만큼의 이익을 얻는지를 알려주는 숫자야.",
        example_story: "채권 가격이 싸져서 만기수익률이 높아진 채권을 사면, 나중에 더 큰 이익을 얻을 수 있어.",
        quiz_question: "채권 가격이 원래보다 싸졌을 때 사서 만기까지 가지고 있으면, 만기수익률은 어떻게 될까?",
        quiz_options: ["더 높아진다", "더 낮아진다", "변하지 않는다"],
        quiz_answer: "더 높아진다",
        related_terms: "표면금리, 국채", difficulty_level: 3, reference: "BOK Glossary"
      },
       {
        term: "원금리스크", term_english: "Principal Risk", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "투자한 원금이 손실될 수 있는 위험.",
        kid_friendly_explanation: "내가 투자한 처음 돈(원금)이 줄어들 수도 있는 위험을 말해.",
        example_story: "친구가 새로 시작한 가게에 투자했지만, 장사가 잘 안돼서 리아는 원금을 잃을 위험에 처했어.",
        quiz_question: "가장 안전한 곳에 돈을 보관하고 싶다면, 원금리스크가 어떤 곳을 골라야 할까?",
        quiz_options: ["가장 낮은 곳", "가장 높은 곳", "상관없는 곳"],
        quiz_answer: "가장 낮은 곳",
        related_terms: "유동성, 변동성", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "예금", term_english: "Deposit", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "은행에 돈을 맡기는 것.",
        kid_friendly_explanation: "은행이라는 금고에 돈을 안전하게 보관하는 거야. 시간이 지나면 이자도 받을 수 있어!",
        example_story: "리아는 용돈을 모아서 은행에 예금했고, 1년 후에 이자가 붙어서 조금 더 많아졌어.",
        quiz_question: "은행에 예금하면 좋은 점은 무엇일까?",
        quiz_options: ["안전하게 보관하고 이자를 받을 수 있다", "돈이 사라진다", "물건으로 바뀐다"],
        quiz_answer: "안전하게 보관하고 이자를 받을 수 있다",
        related_terms: "이자율, 금리, 예대율", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "대출", term_english: "Loan", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "은행에서 돈을 빌리는 것.",
        kid_friendly_explanation: "지금 필요한 큰 돈을 은행에서 빌려서 나중에 조금씩 갚는 거야. 물론 이자도 내야 해.",
        example_story: "리아 아빠는 새 차를 사기 위해 은행에서 대출을 받고, 매달 조금씩 갚고 있어.",
        quiz_question: "은행에서 대출을 받으면 갚을 때 원금 외에 무엇을 더 내야 할까?",
        quiz_options: ["이자", "세금", "선물"],
        quiz_answer: "이자",
        related_terms: "금리, 예대율, 신용등급", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "콜금리", term_english: "Call Rate", chapter: 2, theme: "은행과 금리의 마법",
        simple_definition: "은행들끼리 하루 동안 돈을 빌려주고 받는 금리.",
        kid_friendly_explanation: "은행들도 서로 돈이 부족할 때가 있어서, 하루만 빌렸다가 다음날 바로 갚는 거야. 그때 붙는 이자율이 콜금리야.",
        example_story: "A은행이 갑자기 돈이 필요해서 B은행에게 하루만 빌리고 콜금리만큼의 이자를 주었어.",
        quiz_question: "콜금리는 은행들끼리 얼마 동안 돈을 빌려줄 때 사용하는 금리일까?",
        quiz_options: ["하루", "1년", "10년"],
        quiz_answer: "하루",
        related_terms: "기준금리, 재할인율", difficulty_level: 3, reference: "BOK Glossary"
      },
    ]
  },
   {
    id: 3, title: "알쏭달쏭 물가", theme: "Prices and Inflation", status: 'locked', icon: (className) => <PriceIcon className={className} />,
    secondary_terms: ["소비자물가지수", "생산자물가지수", "인플레이션", "구매력", "생활비", "임금", "경기순환", "가격변동", "물가안정", "통화량"],
    terms: [
      {
        term: "물가지수", term_english: "Price Index", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "여러 상품의 가격 변동을 평균 내어 수치로 나타낸 것.",
        kid_friendly_explanation: "우리가 자주 사는 물건들의 가격표를 모아서 평균 점수를 낸 거야. 점수가 오르면 물가가 오른 거지.",
        example_story: "과자랑 아이스크림 값이 다 오르니까, 엄마가 '물가지수가 또 올랐네' 하고 걱정하셨어.",
        quiz_question: "물가지수가 올라가면 같은 돈으로 살 수 있는 물건의 양은 어떻게 될까?",
        quiz_options: ["더 적어져", "더 많아져", "똑같아"],
        quiz_answer: "더 적어져",
        related_terms: "디플레이션, 실질임금", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "디플레이션", term_english: "Deflation", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "전반적인 물가 수준이 지속적으로 하락하는 현상.",
        kid_friendly_explanation: "물건 가격이 계속해서 내려가는 거야. 좋게 들릴 수 있지만, 모두가 물건 사기를 미루게 돼서 경제가 힘들어질 수 있어.",
        example_story: "디플레이션 시기에는 사람들이 '내일이면 더 싸지겠지' 하면서 돈을 쓰지 않아서 공장이 문을 닫기도 해.",
        quiz_question: "물건 가격이 계속 떨어지는 디플레이션 상황에서, 가게 주인들은 기분이 어떨까?",
        quiz_options: ["슬프다, 물건이 안 팔릴 수 있어서", "기쁘다, 물건을 싸게 팔 수 있어서", "아무렇지 않다"],
        quiz_answer: "슬프다, 물건이 안 팔릴 수 있어서",
        related_terms: "물가지수, 실질임금", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "빅맥지수", term_english: "Big Mac Index", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "빅맥 햄버거 가격으로 각국 통화의 가치 수준을 비교하는 지표.",
        kid_friendly_explanation: "전 세계에서 파는 빅맥 햄버거 가격을 비교해서, 어느 나라 돈이 비싼지 알아보는 재미있는 방법이야.",
        example_story: "미국보다 한국에서 빅맥이 더 싸다면, 우리나라 돈의 가치가 낮게 평가되었다고 생각해볼 수 있어.",
        quiz_question: "빅맥지수는 무엇을 비교하기 위해 만들어졌을까?",
        quiz_options: ["나라별 통화 가치", "햄버거 맛", "매장 크기"],
        quiz_answer: "나라별 통화 가치",
        related_terms: "환율, 경상수지", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "실질임금", term_english: "Real Wage", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "물가를 감안한 임금의 실제 구매력.",
        kid_friendly_explanation: "내가 받은 월급으로 실제로 과자를 몇 개나 살 수 있는지를 알려주는 진짜 힘이야.",
        example_story: "월급은 그대로인데 과자 값이 두 배로 오르자, 리아 아빠의 실질임금은 줄어들었어.",
        quiz_question: "월급이 10% 올랐는데 물가도 10% 올랐다면, 실질임금은 어떻게 될까?",
        quiz_options: ["변하지 않는다", "올라간다", "내려간다"],
        quiz_answer: "변하지 않는다",
        related_terms: "명목금리, 물가지수", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "소비자물가지수", term_english: "Consumer Price Index (CPI)", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "소비자가 사는 물건과 서비스 가격의 변동을 나타내는 지수.",
        kid_friendly_explanation: "우리가 마트에서 사는 물건들의 평균 가격이 얼마나 올랐는지 내려갔는지를 보여주는 숫자야.",
        example_story: "올해 소비자물가지수가 3% 올라서, 작년보다 물건 값이 평균적으로 3% 비싸졌어.",
        quiz_question: "소비자물가지수가 올라갔다는 것은 무엇을 의미할까?",
        quiz_options: ["물건 값이 전반적으로 올랐다", "물건 값이 내렸다", "물건의 종류가 늘어났다"],
        quiz_answer: "물건 값이 전반적으로 올랐다",
        related_terms: "물가지수, 인플레이션, 생산자물가지수", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "인플레이션", term_english: "Inflation", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "물가가 지속적으로 오르는 현상.",
        kid_friendly_explanation: "가게에서 파는 물건 값들이 계속 올라가는 거야. 돈의 가치는 점점 낮아지는 셈이지.",
        example_story: "인플레이션 때문에 작년에 1000원이던 아이스크림이 올해는 1200원이 됐어.",
        quiz_question: "인플레이션이 심해지면 같은 돈으로 살 수 있는 물건은 어떻게 될까?",
        quiz_options: ["더 적어진다", "더 많아진다", "똑같다"],
        quiz_answer: "더 적어진다",
        related_terms: "소비자물가지수, 통화량, 구매력", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "구매력", term_english: "Purchasing Power", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "일정한 돈으로 살 수 있는 물건의 양.",
        kid_friendly_explanation: "내 돈으로 물건을 얼마나 살 수 있는지를 나타내는 힘이야. 물가가 오르면 구매력은 떨어지지.",
        example_story: "1만원의 구매력이 예전보다 낮아져서, 리아는 용돈으로 살 수 있는 과자 개수가 줄어들었어.",
        quiz_question: "물가가 계속 오르면 돈의 구매력은 어떻게 될까?",
        quiz_options: ["낮아진다", "높아진다", "변하지 않는다"],
        quiz_answer: "낮아진다",
        related_terms: "인플레이션, 실질임금", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "생산자물가지수", term_english: "Producer Price Index (PPI)", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "생산자가 파는 물건 가격의 변동을 나타내는 지수.",
        kid_friendly_explanation: "공장에서 만든 물건을 가게에 팔 때의 가격이 얼마나 변했는지 보여주는 숫자야.",
        example_story: "생산자물가지수가 올라서, 공장에서 가게로 파는 빵 값이 올랐고 나중에 소비자 가격도 올랐어.",
        quiz_question: "생산자물가지수가 올라가면 나중에 소비자가 사는 물건 값은 어떻게 될 가능성이 높을까?",
        quiz_options: ["올라갈 가능성이 높다", "내려갈 가능성이 높다", "전혀 상관없다"],
        quiz_answer: "올라갈 가능성이 높다",
        related_terms: "소비자물가지수, 물가지수", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "명목금리", term_english: "Nominal Interest Rate", chapter: 3, theme: "물가와 가격의 세계",
        simple_definition: "물가 상승을 고려하지 않은 표면상의 금리.",
        kid_friendly_explanation: "은행에 적혀있는 이자율 숫자 그대로야. 하지만 물가가 오르면 실제로 받는 이익은 더 적을 수 있어.",
        example_story: "명목금리가 5%인데 물가가 3% 올랐다면, 실제로 돈이 늘어난 효과는 2%밖에 안 돼.",
        quiz_question: "명목금리 3% 예금에 돈을 넣었는데 물가가 5% 올랐다면, 실질적으로는 어떻게 된 걸까?",
        quiz_options: ["손해를 봤다", "이득을 봤다", "똑같다"],
        quiz_answer: "손해를 봤다",
        related_terms: "실질임금, 인플레이션", difficulty_level: 3, reference: "BOK Glossary"
      },
    ]
  },
  {
    id: 4, title: "우리나라 경제 건강검진", theme: "Nation’s Health Check", status: 'locked', icon: (className) => <NationIcon className={className} />,
    secondary_terms: ["GDP", "무역수지", "재정수지", "실업률", "소비지표", "경제성장률", "산업생산", "투자율", "국가부채", "경제정책"],
    terms: [
      {
        term: "경기동향지수", term_english: "Business Cycle Index", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "경기의 현재 흐름이나 미래 방향을 알려주는 종합 지수.",
        kid_friendly_explanation: "경제의 건강 상태를 알려주는 체온계 같은 거야. 올라가면 건강, 내려가면 아픈 신호!",
        example_story: "경기동향지수가 몇 달째 상승해서, 아빠 회사가 곧 바빠질 거라고 하셨어.",
        quiz_question: "경기동향지수가 올라가면, 가게에 손님들이 많아질까, 적어질까?",
        quiz_options: ["많아질 가능성이 높다", "적어질 가능성이 높다", "전혀 상관없다"],
        quiz_answer: "많아질 가능성이 높다",
        related_terms: "경상수지, 고용률", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "경상수지", term_english: "Current Account Balance", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "한 나라가 외국과 물건이나 서비스를 사고판 결과.",
        kid_friendly_explanation: "우리나라가 외국과 장사를 해서 돈을 벌었는지, 썼는지를 보여주는 가계부야.",
        example_story: "반도체 수출이 잘 되어서 우리나라 경상수지가 큰 흑자를 기록했대.",
        quiz_question: "우리나라 사람들이 해외여행을 많이 가서 돈을 많이 쓰면 경상수지에 어떤 영향을 줄까?",
        quiz_options: ["적자가 될 수 있다", "흑자가 된다", "아무 영향이 없다"],
        quiz_answer: "적자가 될 수 있다",
        related_terms: "환율, 외환보유액", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "고용률", term_english: "Employment Rate", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "일할 수 있는 나이의 사람 중 실제로 일하는 사람의 비율.",
        kid_friendly_explanation: "일할 수 있는 어른들 100명 중에 몇 명이 실제로 일하고 있는지를 나타내는 숫자야.",
        example_story: "새로운 공장이 들어서면서 마을의 고용률이 크게 올라갔어.",
        quiz_question: "고용률이 높아진다는 것은 일자리가 늘어난다는 뜻일까?",
        quiz_options: ["네, 그렇다고 볼 수 있어요", "아니요, 반대예요", "상관없어요"],
        quiz_answer: "네, 그렇다고 볼 수 있어요",
        related_terms: "고통지수, 경기동향지수", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "GDP", term_english: "Gross Domestic Product", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "한 나라에서 1년 동안 만들어낸 모든 물건과 서비스의 총 가치.",
        kid_friendly_explanation: "우리나라가 1년 동안 만든 모든 것의 가치를 돈으로 계산한 거야. 나라의 경제 크기를 재는 자처럼!",
        example_story: "올해 새로운 공장들이 많이 생겨서 우리나라 GDP가 작년보다 많이 늘어났대.",
        quiz_question: "GDP가 높아진다는 것은 나라 경제가 어떻게 된 걸까?",
        quiz_options: ["커지고 있다", "작아지고 있다", "변하지 않는다"],
        quiz_answer: "커지고 있다",
        related_terms: "경제성장률, 산업생산", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "실업률", term_english: "Unemployment Rate", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "일하고 싶지만 일자리를 찾지 못한 사람의 비율.",
        kid_friendly_explanation: "일하고 싶은데 직장을 못 구한 사람들이 얼마나 많은지를 보여주는 숫자야.",
        example_story: "경제가 어려워지자 많은 회사가 문을 닫아서 실업률이 높아졌어.",
        quiz_question: "실업률이 낮아진다는 것은 좋은 신호일까, 나쁜 신호일까?",
        quiz_options: ["좋은 신호", "나쁜 신호", "상관없다"],
        quiz_answer: "좋은 신호",
        related_terms: "고용률, 경기동향지수", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "무역수지", term_english: "Trade Balance", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "수출액에서 수입액을 뺀 값.",
        kid_friendly_explanation: "우리가 다른 나라에 판 물건과 다른 나라에서 산 물건의 차이야. 더 많이 팔면 흑자!",
        example_story: "한국이 만든 반도체를 많이 수출해서 무역수지 흑자를 기록했어.",
        quiz_question: "수출보다 수입이 더 많으면 무역수지는 어떻게 될까?",
        quiz_options: ["적자", "흑자", "균형"],
        quiz_answer: "적자",
        related_terms: "경상수지, 환율", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "재정수지", term_english: "Fiscal Balance", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "정부의 수입에서 지출을 뺀 값.",
        kid_friendly_explanation: "나라가 세금으로 받은 돈과 쓴 돈의 차이야. 세금보다 더 많이 쓰면 적자가 되지.",
        example_story: "정부가 도로와 학교를 많이 지어서 올해는 재정수지가 적자를 기록했어.",
        quiz_question: "정부가 받은 세금보다 더 많이 쓰면 재정수지는 어떻게 될까?",
        quiz_options: ["적자", "흑자", "0"],
        quiz_answer: "적자",
        related_terms: "국가부채, 경제정책", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "경제성장률", term_english: "Economic Growth Rate", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "GDP가 전년 대비 얼마나 늘었는지를 나타내는 비율.",
        kid_friendly_explanation: "나라 경제가 작년보다 얼마나 더 컸는지를 퍼센트로 보여주는 거야.",
        example_story: "올해 경제성장률이 3%라는 것은 작년보다 경제가 3% 더 커졌다는 뜻이야.",
        quiz_question: "경제성장률이 높다는 것은 무엇을 의미할까?",
        quiz_options: ["경제가 빠르게 커지고 있다", "경제가 작아지고 있다", "경제가 변하지 않는다"],
        quiz_answer: "경제가 빠르게 커지고 있다",
        related_terms: "GDP, 경기동향지수", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "국가부채", term_english: "Government Debt", chapter: 4, theme: "나라경제의 체온계",
        simple_definition: "정부가 빌린 돈의 총합.",
        kid_friendly_explanation: "나라가 필요한 일을 하느라 빌린 돈을 모두 합친 거야. 너무 많으면 나중에 갚기 힘들 수 있어.",
        example_story: "큰 공사를 하느라 정부가 돈을 많이 빌려서 국가부채가 늘어났어.",
        quiz_question: "국가부채가 너무 많아지면 어떤 문제가 생길 수 있을까?",
        quiz_options: ["이자를 갚기 힘들어진다", "아무 문제없다", "더 많이 빌릴 수 있다"],
        quiz_answer: "이자를 갚기 힘들어진다",
        related_terms: "재정수지, 국채", difficulty_level: 3, reference: "BOK Glossary"
      },
    ]
  },
  {
    id: 5, title: "두근두근 투자와 위험", theme: "Investment and Risk", status: 'locked', icon: (className) => <InvestmentIcon className={className} />,
    secondary_terms: ["주식시장", "채권", "펀드", "수익률", "리스크관리", "자산배분", "투자전략", "파생상품", "분산투자", "자본시장"],
    terms: [
      {
        term: "주가지수", term_english: "Stock Index", chapter: 5, theme: "투자와 위험",
        simple_definition: "주식시장의 전반적인 움직임을 나타내는 지수.",
        kid_friendly_explanation: "여러 회사 주식들의 평균 점수야. 이 점수가 오르면 주식시장이 전반적으로 좋다는 뜻이야.",
        example_story: "새로운 기술이 발표되자 관련 회사들의 주가가 올라 주가지수가 크게 상승했어.",
        quiz_question: "뉴스에서 '주가지수가 하락했다'고 하면, 주식 시장의 분위기는 어떨까?",
        quiz_options: ["안 좋을 가능성이 높다", "좋을 가능성이 높다", "아무도 모른다"],
        quiz_answer: "안 좋을 가능성이 높다",
        related_terms: "PER, ETF", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "주가수익률", term_english: "Price-to-Earnings Ratio (PER)", chapter: 5, theme: "투자와 위험",
        simple_definition: "주가를 주당순이익으로 나눈 값. 주가가 얼마나 고평가/저평가됐는지 보는 지표.",
        kid_friendly_explanation: "회사가 버는 돈에 비해 주가가 얼마나 비싼지를 알려주는 숫자야. 숫자가 낮을수록 버는 돈에 비해 주가가 싼 편이지.",
        example_story: "사람들이 앞으로 더 잘 될 거라고 기대하는 회사는 PER이 높은 경향이 있어.",
        quiz_question: "두 회사가 똑같이 1년에 1000원을 버는데, A회사 주식이 1만원이고 B회사 주식이 2만원이면 어느 회사 PER이 더 높을까?",
        quiz_options: ["B회사", "A회사", "똑같다"],
        quiz_answer: "B회사",
        related_terms: "EPS, 주가지수", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "주식", term_english: "Stock", chapter: 5, theme: "투자와 위험",
        simple_definition: "회사의 소유권 일부를 나타내는 증서.",
        kid_friendly_explanation: "회사를 작은 조각으로 나눠서 그 조각 하나하나를 주식이라고 해. 주식을 사면 그 회사의 주인 중 한 명이 되는 거야.",
        example_story: "민지는 좋아하는 게임회사 주식 10주를 샀어. 이제 민지도 그 회사의 작은 주인이 된 거야.",
        quiz_question: "주식을 산다는 것은 무엇을 의미할까?",
        quiz_options: ["회사의 일부를 소유하는 것", "회사에 돈을 빌려주는 것", "회사 물건을 사는 것"],
        quiz_answer: "회사의 일부를 소유하는 것",
        related_terms: "주가지수, 배당금", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "채권", term_english: "Bond", chapter: 5, theme: "투자와 위험",
        simple_definition: "정부나 기업이 돈을 빌릴 때 발행하는 증서. 정해진 이자를 주고 만기에 원금을 돌려준다.",
        kid_friendly_explanation: "나라나 회사가 '돈 빌려주면 나중에 이자 붙여서 돌려줄게'라고 약속하는 문서야. 주식보다 안전하지만 수익은 적은 편이야.",
        example_story: "정부가 10년 후에 원금에 이자를 더해 돌려주겠다고 약속하는 채권을 발행했어.",
        quiz_question: "채권의 특징으로 맞는 것은?",
        quiz_options: ["정해진 이자를 받는다", "회사의 주인이 된다", "돈을 돌려받지 못한다"],
        quiz_answer: "정해진 이자를 받는다",
        related_terms: "금리, 만기", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "펀드", term_english: "Fund", chapter: 5, theme: "투자와 위험",
        simple_definition: "여러 사람의 돈을 모아 전문가가 대신 투자해주는 상품.",
        kid_friendly_explanation: "혼자서 투자하기 어려우니까 여러 사람이 돈을 모아서 투자 전문가한테 맡기는 거야. 전문가가 주식이나 채권에 투자해줘.",
        example_story: "수진이 엄마는 매달 10만원씩 펀드에 넣어서 전문가가 여러 회사에 나눠 투자하게 했어.",
        quiz_question: "펀드의 장점은 무엇일까?",
        quiz_options: ["전문가가 대신 투자해준다", "절대 손해를 보지 않는다", "투자 지식이 필요없다"],
        quiz_answer: "전문가가 대신 투자해준다",
        related_terms: "분산투자, 자산운용", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "분산투자", term_english: "Diversification", chapter: 5, theme: "투자와 위험",
        simple_definition: "위험을 줄이기 위해 여러 곳에 나눠서 투자하는 전략.",
        kid_friendly_explanation: "계란을 한 바구니에 담으면 바구니가 떨어지면 다 깨지잖아. 그래서 여러 바구니에 나눠 담듯이, 돈도 여러 곳에 나눠서 투자하는 거야.",
        example_story: "준호는 100만원을 한 회사에만 투자하지 않고 10개 회사에 10만원씩 나눠 투자했어.",
        quiz_question: "분산투자를 하는 이유는?",
        quiz_options: ["위험을 줄이기 위해", "더 많은 돈을 벌기 위해", "투자를 쉽게 하기 위해"],
        quiz_answer: "위험을 줄이기 위해",
        related_terms: "포트폴리오, 리스크관리", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "리스크관리", term_english: "Risk Management", chapter: 5, theme: "투자와 위험",
        simple_definition: "투자에서 발생할 수 있는 손실을 최소화하기 위한 전략과 방법.",
        kid_friendly_explanation: "투자하면 돈을 잃을 수도 있어. 그래서 미리 '이것까지만 손해봐도 괜찮아'라고 정하고, 위험을 줄이는 방법을 찾는 거야.",
        example_story: "투자 전문가는 한 종목에 전체 돈의 10%만 투자하는 규칙을 만들어 큰 손실을 막았어.",
        quiz_question: "리스크관리에서 중요한 것은?",
        quiz_options: ["손실 가능성을 미리 파악하고 대비한다", "무조건 많이 투자한다", "손실은 절대 일어나지 않는다"],
        quiz_answer: "손실 가능성을 미리 파악하고 대비한다",
        related_terms: "분산투자, 손절매", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "수익률", term_english: "Rate of Return", chapter: 5, theme: "투자와 위험",
        simple_definition: "투자한 돈 대비 얼마나 이익을 얻었는지 비율로 나타낸 것.",
        kid_friendly_explanation: "1만원을 투자해서 1천원을 벌었다면 수익률은 10%야. 투자가 얼마나 잘됐는지 알려주는 점수 같은 거지.",
        example_story: "지민이는 10만원을 투자해서 1년 후 12만원이 됐어. 수익률은 20%였어.",
        quiz_question: "10,000원을 투자해서 11,000원이 됐다면 수익률은?",
        quiz_options: ["10%", "20%", "1%"],
        quiz_answer: "10%",
        related_terms: "원금, 투자수익", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "포트폴리오", term_english: "Portfolio", chapter: 5, theme: "투자와 위험",
        simple_definition: "투자자가 보유하고 있는 여러 투자자산의 조합.",
        kid_friendly_explanation: "내가 가지고 있는 주식, 채권, 펀드 등을 모두 합쳐서 포트폴리오라고 해. 투자 가방 같은 거야.",
        example_story: "서연이의 포트폴리오에는 삼성전자 주식 10주, 국채 1장, 펀드 2개가 들어있어.",
        quiz_question: "포트폴리오는 무엇을 의미할까?",
        quiz_options: ["내가 가진 투자자산 전체", "투자 전문가", "투자 계획"],
        quiz_answer: "내가 가진 투자자산 전체",
        related_terms: "분산투자, 자산배분", difficulty_level: 2, reference: "BOK Glossary"
      },
    ]
  },
  {
    id: 6, title: "쑥쑥 크는 회사 이야기", theme: "Companies and Growth", status: 'locked', icon: (className) => <CompanyIcon className={className} />,
    secondary_terms: ["창업", "자금조달", "지분", "인수합병", "경영전략", "재무구조", "상장", "기업가치", "주식발행", "투자은행"],
    terms: [
       {
        term: "기업공개", term_english: "Initial Public Offering (IPO)", chapter: 6, theme: "기업의 성장",
        simple_definition: "회사가 처음으로 주식을 일반 사람들에게 파는 것.",
        kid_friendly_explanation: "우리끼리만 알던 비밀 맛집을 모두에게 공개하고, 새로운 주인을 찾는 파티를 여는 것과 같아.",
        example_story: "리아가 만든 게임 회사가 인기가 많아져서, 기업공개(IPO)를 통해 더 큰 회사로 성장하기로 했어.",
        quiz_question: "기업이 IPO를 하는 가장 큰 이유는 무엇일까?",
        quiz_options: ["더 많은 돈을 투자받기 위해", "회사를 다른 사람에게 팔기 위해", "유명해지기 위해"],
        quiz_answer: "더 많은 돈을 투자받기 위해",
        related_terms: "지주회사, 투자은행", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "스톡옵션", term_english: "Stock Option", chapter: 6, theme: "기업의 성장",
        simple_definition: "임직원에게 회사의 주식을 일정한 가격에 살 수 있는 권리를 주는 제도.",
        kid_friendly_explanation: "회사가 직원들에게 '나중에 우리 회사 주식을 싸게 살 수 있는 쿠폰'을 주는 거야. 회사가 잘 되면 모두에게 좋겠지?",
        example_story: "열심히 일한 직원에게 회사 주식을 싸게 살 수 있는 스톡옵션을 주었어.",
        quiz_question: "회사가 직원들에게 스톡옵션을 주는 이유는 무엇일까?",
        quiz_options: ["직원들이 더 열심히 일하게 하려고", "직원들에게 월급을 주기 싫어서", "주식 가격을 낮추려고"],
        quiz_answer: "직원들이 더 열심히 일하게 하려고",
        related_terms: "EPS, IPO", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "창업", term_english: "Startup", chapter: 6, theme: "기업의 성장",
        simple_definition: "새로운 사업을 시작하거나 회사를 설립하는 것.",
        kid_friendly_explanation: "좋은 아이디어로 새로운 회사를 만드는 거야. 처음부터 하나씩 회사를 키워가는 과정이지.",
        example_story: "대학생 진수는 친구들과 함께 앱을 만들어 IT 회사를 창업했어.",
        quiz_question: "창업에 가장 필요한 것은 무엇일까?",
        quiz_options: ["새로운 아이디어와 실행력", "많은 돈만 있으면 된다", "경험이 많은 사람만 할 수 있다"],
        quiz_answer: "새로운 아이디어와 실행력",
        related_terms: "자금조달, 사업계획", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "자금조달", term_english: "Financing", chapter: 6, theme: "기업의 성장",
        simple_definition: "회사가 필요한 돈을 모으는 것. 투자, 대출, 주식발행 등 여러 방법이 있다.",
        kid_friendly_explanation: "회사가 크려면 돈이 필요해. 은행에서 빌리거나, 투자자에게 받거나, 주식을 팔아서 돈을 모으는 거야.",
        example_story: "새 공장을 짓기 위해 회사는 투자자들에게 돈을 받아 자금을 조달했어.",
        quiz_question: "회사가 자금을 조달하는 방법이 아닌 것은?",
        quiz_options: ["직원 월급 깎기", "은행 대출", "주식 발행"],
        quiz_answer: "직원 월급 깎기",
        related_terms: "IPO, 벤처캐피탈", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "지분", term_english: "Equity Stake", chapter: 6, theme: "기업의 성장",
        simple_definition: "회사 소유권의 일부. 주식을 가지면 그만큼 회사의 지분을 갖게 된다.",
        kid_friendly_explanation: "회사를 피자라고 생각해봐. 피자 한 조각이 지분이야. 조각을 많이 가질수록 회사에서 힘이 세지.",
        example_story: "투자자가 회사 지분 30%를 받고 10억원을 투자했어. 이제 회사의 30%가 그의 것이야.",
        quiz_question: "지분을 많이 가진 사람의 특징은?",
        quiz_options: ["회사에서 결정권이 크다", "월급을 많이 받는다", "회사 일을 많이 한다"],
        quiz_answer: "회사에서 결정권이 크다",
        related_terms: "주식, 주주", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "인수합병", term_english: "Mergers and Acquisitions (M&A)", chapter: 6, theme: "기업의 성장",
        simple_definition: "한 회사가 다른 회사를 사들이거나 두 회사가 하나로 합치는 것.",
        kid_friendly_explanation: "두 게임 회사가 힘을 합쳐 하나의 큰 회사가 되거나, 큰 회사가 작은 회사를 사서 자기 회사로 만드는 거야.",
        example_story: "A회사가 B회사를 인수해서 더 큰 회사가 됐어. 이제 B회사 직원들도 A회사 사람이 됐지.",
        quiz_question: "회사가 인수합병을 하는 이유는?",
        quiz_options: ["더 크고 강한 회사가 되려고", "직원을 해고하려고", "돈을 쓰려고"],
        quiz_answer: "더 크고 강한 회사가 되려고",
        related_terms: "기업가치, 경영권", difficulty_level: 3, reference: "BOK Glossary"
      },
      {
        term: "배당금", term_english: "Dividend", chapter: 6, theme: "기업의 성장",
        simple_definition: "회사가 번 이익 중 일부를 주주들에게 나눠주는 돈.",
        kid_friendly_explanation: "회사가 돈을 많이 벌면 주식을 가진 사람들에게 '고마워요, 이거 받으세요'하고 돈을 나눠주는 거야.",
        example_story: "삼성전자 주식을 가진 할아버지는 매년 배당금을 받아서 손주들에게 용돈을 주셨어.",
        quiz_question: "배당금을 받을 수 있는 사람은?",
        quiz_options: ["주식을 가진 주주", "회사 직원만", "아무나 받을 수 있다"],
        quiz_answer: "주식을 가진 주주",
        related_terms: "주주, 이익배당", difficulty_level: 1, reference: "BOK Glossary"
      },
      {
        term: "경영전략", term_english: "Business Strategy", chapter: 6, theme: "기업의 성장",
        simple_definition: "회사가 목표를 달성하기 위해 세우는 계획과 방법.",
        kid_friendly_explanation: "회사가 '우리 이렇게 해서 1등 하자!'라고 세우는 큰 계획이야. 어떤 상품을 만들고, 어디에 팔지 정하는 거지.",
        example_story: "게임 회사는 경영전략을 세워서 모바일 게임에 집중하기로 했어.",
        quiz_question: "좋은 경영전략의 특징은?",
        quiz_options: ["회사의 장점을 살리고 목표가 명확하다", "무조건 돈만 많이 쓴다", "다른 회사를 따라한다"],
        quiz_answer: "회사의 장점을 살리고 목표가 명확하다",
        related_terms: "경영계획, 시장분석", difficulty_level: 2, reference: "BOK Glossary"
      },
      {
        term: "상장", term_english: "Stock Listing", chapter: 6, theme: "기업의 성장",
        simple_definition: "회사의 주식을 증권거래소에 등록해서 누구나 사고팔 수 있게 하는 것.",
        kid_friendly_explanation: "회사 주식을 마트에 진열하는 것과 비슷해. 증권거래소라는 큰 시장에 올려놓으면 누구나 사고 팔 수 있게 돼.",
        example_story: "작은 IT 회사가 코스닥에 상장되어 이제 누구나 그 회사 주식을 살 수 있게 됐어.",
        quiz_question: "회사가 상장을 하면 어떤 점이 좋을까?",
        quiz_options: ["더 많은 사람들에게 투자를 받을 수 있다", "세금을 안 낸다", "직원을 많이 뽑을 수 있다"],
        quiz_answer: "더 많은 사람들에게 투자를 받을 수 있다",
        related_terms: "IPO, 거래소", difficulty_level: 2, reference: "BOK Glossary"
      },
    ]
  },
  {
    id: 7, title: "세계를 잇는 무역", theme: "Trade and Global Links", status: 'locked', icon: (className) => <TradeIcon className={className} />, 
    secondary_terms: ["수출입", "무역수지", "환율변동", "관세", "국제금융", "교역조건", "글로벌화", "외환시장", "국제통화", "무역협정"],
    terms: [
        {
            term: "환율", term_english: "Exchange Rate", chapter: 7, theme: "무역과 세계의 연결",
            simple_definition: "한 나라 돈을 다른 나라 돈으로 바꾸는 비율.",
            kid_friendly_explanation: "다른 나라 돈과 우리나라 돈을 바꿀 때의 교환 비율이야. 1달러를 1300원으로 바꾸는 것처럼!",
            example_story: "환율이 올라서, 미국에서 장난감을 사려면 전보다 더 많은 원을 내야 했어.",
            quiz_question: "환율이 '상승'했다는 것은 1달러를 바꾸기 위해 필요한 우리 돈이 더 많아진다는 뜻일까?",
            quiz_options: ["네, 맞아요", "아니요, 더 적어진다는 뜻이에요", "환율은 숫자와 상관없어요"],
            quiz_answer: "네, 맞아요",
            related_terms: "경상수지, 외환보유액", difficulty_level: 2, reference: "BOK Glossary"
        },
    ]
  },
  { 
    id: 8, title: "나라 살림과 세금", theme: "Government and Public Systems", status: 'locked', icon: (className) => <GovernmentIcon className={className} />,
    secondary_terms: ["조세정책", "복지정책", "정부지출", "재정적자", "세율", "사회안전망", "공공서비스", "예산", "세입세출", "공공투자"],
    terms: [
      {
          term: "재정정책", term_english: "Fiscal Policy", chapter: 8, theme: "정부와 공공 시스템",
          simple_definition: "정부가 세금을 걷거나 돈을 써서 경제를 조절하는 정책.",
          kid_friendly_explanation: "정부가 돈을 써서 다리를 만들거나, 세금을 깎아주어서 사람들이 돈을 더 쓰게 만드는 등 경제에 힘을 불어넣는 방법이야.",
          example_story: "경제가 어려워지자, 정부는 재정정책을 통해 큰 놀이공원을 지어 일자리를 많이 만들기로 했어.",
          quiz_question: "경기가 너무 안 좋을 때, 정부는 재정정책으로 어떤 일을 할까?",
          quiz_options: ["세금을 늘리고, 씀씀이를 줄인다", "세금을 줄이고, 씀씀이를 늘린다", "아무것도 안 한다"],
          quiz_answer: "세금을 줄이고, 씀씀이를 늘린다",
          related_terms: "조세부담률, 공공재", difficulty_level: 2, reference: "BOK Glossary"
      },
    ]
  },
  { 
    id: 9, title: "마음이 만드는 경제", theme: "Psychology and Market Behavior", status: 'locked', icon: (className) => <PsychologyIcon className={className} />,
    secondary_terms: ["소비심리", "게임이론", "경쟁시장", "독점", "담합", "가격전략", "협상", "위험회피", "투자심리", "시장균형"],
    terms: [
      {
        term: "베블런효과", term_english: "Veblen Effect", chapter: 9, theme: "심리와 경쟁",
        simple_definition: "가격이 높을수록 더 많이 사는 과시소비 현상.",
        kid_friendly_explanation: "비쌀수록 더 희귀하고 특별해 보여서 사람들이 더 사고 싶어하는 마음이야. '자랑템' 효과랄까?",
        example_story: "한정판 운동화는 가격이 아주 비쌌지만, 오히려 더 많은 사람이 사려고 줄을 섰어. 이게 바로 베블런효과야.",
        quiz_question: "아주 비싼 명품 가방이 잘 팔리는 현상은 어떤 효과로 설명할 수 있을까?",
        quiz_options: ["베블런효과", "세일효과", "나비효과"],
        quiz_answer: "베블런효과",
        related_terms: "수요탄력성, 카르텔", difficulty_level: 3, reference: "BOK Glossary"
      },
    ]
  },
  { 
    id: 10, title: "위기와 회복의 순간", theme: "Crisis and Recovery", status: 'locked', icon: (className) => <CrisisIcon className={className} />,
    secondary_terms: ["금융위기", "구조조정", "경기침체", "회복정책", "중앙은행정책", "통화완화", "재정확대", "국제공조", "금융안정", "유동성지원"],
    terms: [
       {
        term: "서킷브레이커", term_english: "Circuit Breaker", chapter: 10, theme: "위기와 회복",
        simple_definition: "주식시장이 갑자기 너무 많이 떨어질 때 거래를 잠시 멈추는 제도.",
        kid_friendly_explanation: "놀이기구가 너무 위험하게 흔들릴 때 잠시 멈추는 안전장치 같은 거야. 모두가 진정할 시간을 주는 거지.",
        example_story: "주식시장이 갑자기 폭락하자, 서킷브레이커가 발동되어 20분 동안 모든 거래가 멈췄어.",
        quiz_question: "서킷브레이커는 주식시장이 어떻게 될 때 발동될까?",
        quiz_options: ["너무 많이 오를 때", "너무 많이 떨어질 때", "사람이 없을 때"],
        quiz_answer: "너무 많이 떨어질 때",
        related_terms: "주가지수, 증거금", difficulty_level: 2, reference: "BOK Glossary"
      },
    ]
  },
  { 
    id: 11, title: "신기한 금융 도구들", theme: "Financial Tools and Derivatives", status: 'locked', icon: (className) => <ToolsIcon className={className} />,
    secondary_terms: ["파생계약", "선물옵션", "헤지전략", "레버리지", "단기금융시장", "스왑계약", "마진", "투자전략", "차익거래", "위험관리"],
    terms: [
       {
        term: "파생금융상품", term_english: "Derivative", chapter: 11, theme: "금융 도구와 파생상품",
        simple_definition: "다른 금융상품의 가치에 따라 가격이 결정되는 금융계약.",
        kid_friendly_explanation: "사과 주스가 사과 가격에 따라 가격이 바뀌는 것처럼, 다른 것의 가치를 따라가는 특별한 금융 약속이야.",
        example_story: "농부는 옥수수 가격이 떨어질까 봐 걱정돼서, 옥수수 가격에 연동된 파생금융상품에 가입했어.",
        quiz_question: "파생금융상품의 가치는 무엇에 따라 변할까?",
        quiz_options: ["다른 금융상품(기초자산)의 가치", "날씨", "정부의 결정"],
        quiz_answer: "다른 금융상품(기초자산)의 가치",
        related_terms: "옵션, 선물거래, 스왑", difficulty_level: 4, reference: "BOK Glossary"
      },
    ]
  },
  { 
    id: 12, title: "미래를 여는 경제", theme: "Future Economics", status: 'locked', icon: (className) => <FutureIcon className={className} />,
    secondary_terms: ["디지털화폐", "지속가능성", "탄소경제", "녹색금융", "기술혁신", "스타트업", "공유경제", "자동화", "인공지능", "데이터경제"],
    terms: [
       {
        term: "기회비용", term_english: "Opportunity Cost", chapter: 12, theme: "미래의 경제",
        simple_definition: "하나를 선택함으로써 포기해야 하는 다른 선택의 가치.",
        kid_friendly_explanation: "아이스크림을 사 먹기로 결정했을 때, 그 돈으로 살 수 있었던 초콜릿이 바로 기회비용이야.",
        example_story: "리아는 주말에 놀이공원에 가는 대신 집에서 책을 읽었어. 리아의 기회비용은 놀이공원에서 놀 수 있었던 즐거움이야.",
        quiz_question: "두 가지 맛있는 과자 중 하나만 살 수 있을 때, 내가 선택하지 않은 과자의 가치를 무엇이라고 할까?",
        quiz_options: ["기회비용", "매몰비용", "할인비용"],
        quiz_answer: "기회비용",
        related_terms: "한계비용, 의사결정", difficulty_level: 1, reference: "BOK Glossary"
      },
    ]
  }
] as Omit<Chapter, 'score' | 'totalQuestions'>[]).map(chapter => ({
    ...chapter,
    score: null,
    totalQuestions: chapter.terms.length,
}));
