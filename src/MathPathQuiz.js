import { useState } from "react";

const questions = [
  {
    question: "중간고사도 다 쳤는데, 나는 어떤 상태일까?",
    options: [
      { text: "수학을 망한 것 같다. 포기하자...ㅠㅠ", value: "외향" },
      { text: "시험을 잘 치진 못했지만, 앞으로 수학 성적을 더 올려보고자 한다!", value: "내향" }
    ]
  },
  {
    question: "다음 중 더 흥미로운 수학 영역은?",
    options: [
      { text: "함수의 극한과 변화율", value: "미적분" },
      { text: "확률과 통계를 통한 데이터 해석", value: "확통" },
      { text: "도형의 성질과 공간 추론", value: "기하" }
    ]
  },
  {
    question: "어떤 일에 더 흥미를 느끼나요?",
    options: [
      { text: "실험, 분석, 설계 등 눈에 보이는 원리를 탐구하는 일", value: "자연계열" },
      { text: "사람과 사회, 경제 흐름 등을 이해하고 기획하는 일", value: "인문사회계열" },
      { text: "지식 전달과 교육, 학습법을 고민하는 일", value: "교육계열" }
    ]
  },
  {
    question: "당신의 공부 스타일은?",
    options: [
      { text: "수능 중심의 문제풀이와 효율을 중시", value: "정시" },
      { text: "프로젝트, 탐구, 발표 중심이 더 잘 맞는다", value: "학생부" }
    ]
  },
  {
    question: "수학 수업 시간에 가장 기대되는 순간은?",
    options: [
      { text: "선생님의 실전 문제 풀이와 팁을 들을 때", value: "정시" },
      { text: "친구들과 함께 주제를 정해 탐구할 때", value: "학생부" }
    ]
  },
  {
    question: "다음 중 당신의 공부 습관에 더 가까운 것은?",
    options: [
      { text: "하루에 문제집 100제 풀기 도전이 좋다", value: "정시" },
      { text: "한 개 주제에 대해 글 쓰고 발표하는 게 좋다", value: "학생부" }
    ]
  }
];

export default function MathPathQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (value) => {
    setAnswers([...answers, value]);
    setCurrent(current + 1);
  };

  const getResult = () => {
    const subjectCounts = { 미적분: 0, 기하: 0, 확통: 0 };
    const pathCounts = { 정시: 0, 학생부: 0 };

    answers.forEach((a) => {
      if (subjectCounts[a] !== undefined) subjectCounts[a]++;
      if (pathCounts[a] !== undefined) pathCounts[a]++;
    });

    const preferredSubject = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0][0];
    const preferredPath = Object.entries(pathCounts).sort((a, b) => b[1] - a[1])[0][0];

    return { preferredSubject, preferredPath };
  };

  if (current < questions.length) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">
            {questions[current].question}
          </h2>
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.value)}
              className="block w-full my-3 py-3 rounded-xl bg-pink-300 hover:bg-sky-300 text-white text-lg shadow-md transition duration-300"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const result = getResult();
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-4 text-sky-500">🎓 결과 분석</h2>
        <p className="mb-2 text-lg">
          추천 선택 과목: <strong className="text-pink-600">{result.preferredSubject}</strong>
        </p>
        <p className="mb-2 text-lg">
          추천 입시 전략:{" "}
          <strong className="text-sky-600">
            {result.preferredPath === "정시" ? "정시 중심" : "학생부 중심"}
          </strong>
        </p>
        <p className="mt-4 text-base">
          💡 학습 팁:{" "}
          {result.preferredSubject === "미적분" && " 개념 정리와 고난도 문제 해결에 집중해 보세요."}
          {result.preferredSubject === "확통" && " 실생활 문제와 통계 분석 능력을 키워보세요."}
          {result.preferredSubject === "기하" && " 공간 감각을 기르는 활동과 증명 연습에 집중하세요."}
        </p>
      </div>
    </div>
  );
}
