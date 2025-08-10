import PlaceholderPage from "@/components/PlaceholderPage";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <PlaceholderPage
      title={t('howItWorksDetail')}
      description={t('howItWorksDetailDescription')}
    />
  );
}
