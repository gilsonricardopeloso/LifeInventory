
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

// Get default settings from localStorage or use initial values
const getInitialSettings = () => {
  const storedSettings = localStorage.getItem('user-settings');
  if (storedSettings) {
    return JSON.parse(storedSettings);
  }
  return {
    notifications: true,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  };
};

export default function Settings() {
  const [notifications, setNotifications] = useState(getInitialSettings().notifications);
  const [theme, setTheme] = useState<string>(getInitialSettings().theme);
  const { toast } = useToast();
  const { language, setLanguage, t, isLoading } = useLanguage();

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      notifications,
      theme,
    };
    localStorage.setItem('user-settings', JSON.stringify(settings));
  }, [notifications, theme]);

  // Apply theme from localStorage on component mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', isDark);
    
    // Get the localized theme name based on isDark
    const themeValue = t(isDark ? 'darkThemeValue' : 'lightThemeValue', 'settings');
    
    // Display toast message
    toast({
      title: t('themeChanged', 'settings'),
      description: t('themeChangedDesc', 'settings').replace('{theme}', themeValue),
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    // Get the localized language name
    const languageName = value === 'pt-BR' 
      ? t('portugueseLanguage', 'settings') 
      : t('englishLanguage', 'settings');
    
    // Display toast message
    toast({
      title: t('languageChanged', 'settings'),
      description: t('languageChangedDesc', 'settings').replace('{language}', languageName),
    });
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotifications(enabled);
    toast({
      title: t(enabled ? 'notificationsEnabled' : 'notificationsDisabled', 'settings'),
      description: t(enabled ? 'notificationsEnabledDesc' : 'notificationsDisabledDesc', 'settings'),
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <SettingsIcon className="w-7 h-7" /> {t('settings', 'settings')}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('preferences', 'settings')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{t('notifications', 'settings')}</div>
              <div className="text-sm text-muted-foreground">
                {t('notificationsDesc', 'settings')}
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={handleNotificationsChange} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{t('theme', 'settings')}</div>
              <div className="text-sm text-muted-foreground">
                {theme === "light" ? t('lightTheme', 'settings') : t('darkTheme', 'settings')}
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{t('language', 'settings')}</div>
              <div className="text-sm text-muted-foreground">
                {language === "pt-BR" ? t('portugueseLanguage', 'settings') : t('englishLanguage', 'settings')}
              </div>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
