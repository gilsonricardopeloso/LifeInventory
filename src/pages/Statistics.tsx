
import React from "react";
import HabitStatsMock from "@/components/profile/HabitStatsMock";
import { useLanguage } from "@/contexts/LanguageContext";

const Statistics = () => {
  const { t } = useLanguage();

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">{t('title', 'statistics')}</h1>
      <HabitStatsMock />
    </div>
  );
};

export default Statistics;
