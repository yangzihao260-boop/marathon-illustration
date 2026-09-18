import React from 'react';
import { X, BookOpen, Lightbulb, HelpCircle, CheckCircle2 } from 'lucide-react';
import { STORY_SENTENCES } from '../data/storyData';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-200">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              备课教学参考教案 (Teacher's Lesson Guide)
            </h2>
            <p className="text-xs text-slate-500">
              小学英语四年级/五年级课文《The Story of the Marathon》
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm text-slate-700">
          {/* Section 1: 教学目标 */}
          <div className="rounded-2xl bg-amber-50/60 p-4 border border-amber-200/60">
            <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              本课教学目标 (Learning Objectives)
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-amber-950">
              <li>能够流利朗读课文5个核心句子，感知叙事故事的情感与节奏。</li>
              <li>掌握核心词汇：marathon, race, ancient Greece, battle, soldier, news, remember。</li>
              <li>理解重点句型：&quot;He ran so far that he died after he finished.&quot; (so... that... 如此……以至于……)。</li>
              <li>结合连续画面，能够用自己的话或关键词复述马拉松的历史由来。</li>
            </ul>
          </div>

          {/* Section 2: 课堂教学 4 步法建议 */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              课堂多媒体课件使用步骤建议
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <div className="font-semibold text-xs text-amber-800 mb-1">步骤 1：看图预测与激趣</div>
                <p className="text-xs text-slate-600">
                  先在【逐页讲读模式】展示第一张图片（现代马拉松比赛），提问：&quot;Have you heard of marathon? What are they doing?&quot; 引入主题。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <div className="font-semibold text-xs text-amber-800 mb-1">步骤 2：逐页点读与精讲</div>
                <p className="text-xs text-slate-600">
                  逐页点击【下一页】，让学生观察插画细节（古希腊战袍、士兵奔跑气喘吁吁、纪念英雄），点击句子朗读发音，学生模仿跟读。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <div className="font-semibold text-xs text-amber-800 mb-1">步骤 3：一键连读全篇</div>
                <p className="text-xs text-slate-600">
                  点击顶部【连读整篇故事】，系统会自动平滑翻页并连续朗诵5幕图文，引导学生整体感知故事完整性。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <div className="font-semibold text-xs text-amber-800 mb-1">步骤 4：全景画卷与复述</div>
                <p className="text-xs text-slate-600">
                  切换为【全部图文可见】模式，可关掉中文释义，指着长图让学生看板书或图画尝试复述课文故事。
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: 课文全文中英文对照表 */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <HelpCircle className="h-4 w-4 text-amber-500" />
              课文逐句对照表
            </h3>
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
              {STORY_SENTENCES.map((item) => (
                <div key={item.id} className="p-3 bg-white hover:bg-slate-50 text-xs">
                  <div className="font-medium text-slate-900 font-serif">
                    <span className="font-bold text-amber-700 mr-2">[{item.stepNumber}]</span>
                    {item.sentence}
                  </div>
                  <div className="text-slate-500 mt-1 pl-6">
                    {item.chinese}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-100 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors shadow-xs"
          >
            返回课文教学
          </button>
        </div>
      </div>
    </div>
  );
};
