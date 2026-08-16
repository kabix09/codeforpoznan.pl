export const useTracking = () => {
  const { gtag } = useGtag()

  // 1. Kliknięcie w linki społeczności (Discord/Slack/Wolontariat)
  const trackJoin = (source: string) => {
    if(gtag) gtag('event', 'join_community', { event_label: source })
  }

  // 2. Kliknięcie "Nasze projekty" w Hero
  const trackProjectsScroll = () => {
    if(gtag) gtag('event', 'scroll_to_projects', { event_category: 'navigation' })
  }

  // 3. Otwarcie szczegółów konkretnego projektu
  const trackProjectOpen = (projectName: string) => {
    if(gtag) gtag('event', 'view_project', { event_label: projectName })
  }

  // 4. Przejście na GitHuba
  const trackGithub = (repo: string = 'main') => {
    if(gtag) gtag('event', 'outbound_github', { event_label: repo })
  }

  // Śledzenie zmiany zakładki (Dołącz vs Zgłoś problem)
  const trackFormTabChange = (tabName: string) => {
    if(gtag) gtag('event', 'form_tab_switch', { event_label: tabName })
  }

    // Śledzenie udanej wysyłki formularza
  const trackFormSubmit = (formType: string) => {
    if(gtag) gtag('event', 'generate_lead', { event_label: formType })
  }

  return {
    trackJoin,
    trackProjectsScroll,
    trackProjectOpen,
    trackGithub,
    trackFormTabChange,
    trackFormSubmit
  }
}
