import scene1 from '../assets/images/marathon_scene_1_1789773464409.jpg';
import scene2 from '../assets/images/marathon_scene_2_1789773477133.jpg';
import scene3 from '../assets/images/marathon_scene_3_1789773488529.jpg';
import scene4 from '../assets/images/marathon_scene_4_1789773498757.jpg';
import scene5 from '../assets/images/marathon_scene_5_1789773508285.jpg';
import { StorySentence } from '../types';

export const STORY_SENTENCES: StorySentence[] = [
  {
    id: 1,
    stepNumber: 1,
    title: "第一幕：现代马拉松比赛",
    sentence: "A marathon is a very long running race.",
    chinese: "马拉松是一项非常长的长跑比赛。",
    words: [
      { word: "marathon", phonetic: "/ˈmærəθən/", meaning: "马拉松赛跑", key: true },
      { word: "running", phonetic: "/ˈrʌnɪŋ/", meaning: "跑步", key: false },
      { word: "race", phonetic: "/reɪs/", meaning: "赛跑；比赛", key: true },
    ],
    explanation: "开门见山点题：介绍什么是马拉松比赛——一条长长的大街上，成千上万的人在奋勇奔跑。",
    image: scene1,
    imageAlt: "一群人在城市宽阔的大街上参加热闹的马拉松长跑比赛",
    teacherNote: "引导提问：What is a marathon? Look at the people, are they running? Yes, it is a very long race!",
  },
  {
    id: 2,
    stepNumber: 2,
    title: "第二幕：古希腊的战役",
    sentence: "Long long ago, in ancient Greece, there was a great battle.",
    chinese: "很久很久以前，在古希腊，发生了一场伟大的战役。",
    words: [
      { word: "Long ago", phonetic: "/lɒŋ əˈɡəʊ/", meaning: "很久以前", key: false },
      { word: "ancient", phonetic: "/ˈeɪnʃənt/", meaning: "古代的", key: true },
      { word: "Greece", phonetic: "/ɡriːs/", meaning: "希腊", key: true },
      { word: "battle", phonetic: "/ˈbætl/", meaning: "战役；战斗", key: true },
    ],
    explanation: "故事溯源：画面回到两千五百年前的古希腊战场，希腊士兵英勇保卫家园。",
    image: scene2,
    imageAlt: "古希腊马拉松平原上的古代战役背景，手持盾牌盔甲的英勇希腊士兵",
    teacherNote: "引导提问：Where did this happen? In ancient Greece. There was a big battle.",
  },
  {
    id: 3,
    stepNumber: 3,
    title: "第三幕：报信的士兵",
    sentence: "A soldier ran a long way to tell people the good news.",
    chinese: "一名士兵跑了很远的路去告诉人们这个好消息。",
    words: [
      { word: "soldier", phonetic: "/ˈsəʊldʒə(r)/", meaning: "士兵", key: true },
      { word: "ran", phonetic: "/ræn/", meaning: "跑（run的过去式）", key: true },
      { word: "news", phonetic: "/njuːz/", meaning: "新闻；消息", key: true },
    ],
    explanation: "核心情节：年轻士兵为了把胜利的好消息带给雅典人民，不分昼夜奋力狂奔。",
    image: scene3,
    imageAlt: "一名奔跑得气喘吁吁、大汗淋漓的古希腊士兵，在山间道路上奔向雅典城",
    teacherNote: "动作模仿互动：Let's run like the brave soldier! He is panting and tired, but he never stops!",
  },
  {
    id: 4,
    stepNumber: 4,
    title: "第四幕：英雄的牺牲",
    sentence: "He ran so far that he died after he finished.",
    chinese: "他跑了太远，以至于到达终点后牺牲了。",
    words: [
      { word: "so... that...", phonetic: "", meaning: "如此……以至于……", key: true },
      { word: "died", phonetic: "/daɪd/", meaning: "死去；牺牲（die的过去式）", key: false },
      { word: "finished", phonetic: "/ˈfɪnɪʃt/", meaning: "完成；结束", key: true },
    ],
    explanation: "情感高潮：士兵用尽最后一口气说出“我们胜利了”，人们满怀敬意为英雄默哀送别。",
    image: scene4,
    imageAlt: "士兵安详地躺在床上，雅典的人民与长者满怀敬意围绕在旁边为他送别",
    teacherNote: "情感教育：He gave his life to deliver the news. The people loved and respected him.",
  },
  {
    id: 5,
    stepNumber: 5,
    title: "第五幕：纪念英雄与马拉松",
    sentence: "People made the marathon race to remember him.",
    chinese: "人们创办了马拉松比赛来纪念他。",
    words: [
      { word: "remember", phonetic: "/rɪˈmembə(r)/", meaning: "纪念；记住", key: true },
      { word: "made", phonetic: "/meɪd/", meaning: "设立；创办（make的过去式）", key: false },
    ],
    explanation: "首尾呼应：为了永远记住这位勇敢的士兵，人们设立了42.195公里的马拉松长跑比赛，并延续至今。",
    image: scene5,
    imageAlt: "写着MARATHON RACE横幅的现代比赛现场，成群热情的选手和欢呼的人群，纪念英雄",
    teacherNote: "总结复习：Why do we run a marathon today? To remember him! What an inspiring story!",
  },
];
