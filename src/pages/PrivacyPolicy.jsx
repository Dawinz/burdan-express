import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  const sections = [
    { title: t('privacySection1Title'), content: t('privacySection1Content') },
    { title: t('privacySection2Title'), list: [t('privacySection2Item1'), t('privacySection2Item2'), t('privacySection2Item3'), t('privacySection2Item4')] },
    { title: t('privacySection3Title'), content: t('privacySection3Content') },
    { title: t('privacySection4Title'), content: <span>{t('privacyContactPrefix')} <a href="mailto:privacy@burdanexpress.co.tz" className="text-burdan-red hover:underline font-semibold">privacy@burdanexpress.co.tz</a>.</span> }
  ];

  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">{t('legalBadge')}</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">{t('privacyPolicyTitle')}</h1>
          <p className="text-burdan-darkgray/50 font-body mt-3">{t('lastUpdated')}</p>
        </div>
        <div className="space-y-5">
          {sections.map(({ title, content, list }, i) => (
            <section key={i} className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <h2 className="text-lg font-heading font-bold text-burdan-black mb-3">{title}</h2>
              {content && <p className="text-burdan-darkgray/70 font-body text-sm leading-relaxed">{content}</p>}
              {list && <ul className="space-y-2 text-burdan-darkgray/70 font-body text-sm">{list.map((item, j) => <li key={j} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-burdan-red mt-2 flex-shrink-0" />{item}</li>)}</ul>}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
