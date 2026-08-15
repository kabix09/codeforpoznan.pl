import type Project from '~/types/projects'

const projects: Project[] = [
  {
    id: "01",
    name: "Watchdog Polska",
    date: "Mar 2021",
    desc: "System usprawniający obieg dokumentów i korespondencji sądowej dla stowarzyszenia chroniącego prawo do informacji.",
    longDesc:
        "Watchdog Polska od 2003 roku stoi na straży prawa do informacji. Rozumiane jest ono nie tylko jako warunek funkcjonowania dobrego państwa, ale przede wszystkim jako jedno z praw człowieka, które chroni ludzką godność, daje wolność wyrażania opinii i zabezpiecza przed nadużyciami władzy. W ciągu 17 lat swojej działalności Sieć Obywatelska Watchdog Polska uczestniczyła w około 1122 sprawach sądowych dotyczących prawa do informacji. Niektóre z nich miały przełomowe znaczenie dla społeczeństwa. Razem współtworzymy system służący do usprawnienia obiegu dokumentów Stowarzyszenia, w szczególności korespondencji sądowej.",
    tags: ["React.js", "PostgreSQL", "Django", "Min.io"],
    link: "https://github.com/watchdogpolska/small_eod",
    image: "https://codeforpoznan.pl/img/watchdog.91dd97f4.png",
  },
  {
    id: "02",
    name: "Wysadź ulicę",
    date: "Sep 2022",
    desc: "Aplikacja do wizualizacji i planowania przestrzeni miejskiej poprzez dodawanie roślin i elementów małej architektury do zdjęć.",
    longDesc:
      "Wysadźulice.pl jest przykładem aplikacji umożliwiającej zaplanowanie czy zaprojektowanie przestrzeni, która nas otacza. Każdy użytkownik apliakcji ma dzięki niej realny wpływ na wygląd i funkcjonalność ulicy, przy której mieszka czy parku do którego chodzi. Wystraczy zrobić zdjęcie lub wgrać obraz z Google Street View, następnie dodać elementy w postaci: kwiatów, krzewów, drzew czy ławki. Tak przygotowana wizualizacja może posłużyć na konsultacjach z władzami miast czy gmin.",
    tags: [],
    link: "https://github.com/CodeForPoznan/wysadzulice.pl",
    image: "https://codeforpoznan.pl/img/wysadz_ulice.d0a0226c.png",
  },
  {
    id: "03",
    name: "StreetMix",
    date: "Feb 2022",
    desc: "Polska wersja narzędzia do projektowania i wizualizacji koncepcji ulic przez planistów miejskich i społeczności.",
    longDesc:
      "Oryginalny Streetmix jest dziełem Code for America, które w 2013 roku podczas hacknightu postanowiło stworzyć narzędzie, które pomoże miejskim planistom w przedstawianiu koncepcji ich planu na rewitalizacje miejskiej przestrzeni. Najczęstszym rozwiązaniem po jakie sięgają planiści jest wykonanie makiet z papieru, które zwizualizują krajobraz. Tworząc internetową wersję tego działania, planiści mogą dotrzeć do szerszego grona odbiorców niż podczas samych spotkań, a także pozwolić członkom społeczności na dzielenie się i remiksowanie swoich dzieł. Jest to jeden z pierwszych naszych projektów, które mieliśmy przyjemność przetłumaczyć tak, aby można było wykorzystać te rozwiązanie na polskim gruncie.",
    tags: ["React.js"],
    link: "https://github.com/CodeForPoznan/streetmix",
    image: "https://codeforpoznan.pl/img/streetmix.6dc2fe72.png",
  },
  {
    id: "04",
    name: "Volontulo",
    date: "Jun 2023",
    desc: "Portal łączący wolontariuszy z organizacjami i instytucjami poszukującymi wsparcia.",
    longDesc:
      "Portal Volontulo powstał dla ludzi i organizacji skupionych wokół idei pomocy innym poprzez udział we wolontariacie. Celem projektu jest pomoc we wzajemnym odnalezieniu się ludzi, którzy chcą realizować się jako wolontariusze/szki oraz organizacji i instytucji, które takich osób poszukują. Podział na strefę \"Wolontariusza\" oraz \"Strefę organizacji i instytucji\" umożliwa użytkownikom zwinną nawigację na stronie.",
    tags: ["Angular", "Django"],
    link: "https://github.com/CodeForPoznan/volontulo",
    image: "https://codeforpoznan.pl/img/volontulo.22216b68.png",
  },
  {
    id: "05",
    name: "Bank Empatii",
    date: "Nov 2023",
    desc: "Strona wspierająca poszukiwania dawcy komórek macierzystych, z informacjami o rejestracji i mapą punktów poboru krwi.",
    longDesc:
      "Bank Empatii to projekt strony Patrycji Krawczyk, która zmaga się z białaczką limfoblastyczną i chce znaleźć dawcę komórek macierzystych o podobnym do Patrycji kodzie genetycznym. Trzy główne panele \"Historia Patrycji\", \"Jak wygląda badanie?\" oraz \"Gdzie się zgłosić?\" kierują użytkowników strony do uzyskania informacji na temat jak zostać dawcą szpiku oraz czym jest Rejestr Dawców. Na stronie znajduje się mapa Polski z umiejscowieniem punktów poboru krwi.",
    tags: [],
    link: "https://github.com/CodeForPoznan/empatia",
    image: "https://codeforpoznan.pl/img/bank_empatii.82db7572.png",
  },
  {
    id: "06",
    name: "Platforma społeczności",
    date: "Jan 2024",
    desc: "Trzecia wersja oficjalnej strony internetowej stowarzyszenia Code for Poznań, odzwierciedlająca jego rozwój.",
    longDesc:
      "Jest to trzecia wersja strony internetowej naszej organizacji. To pokazuje, że jako stowarzyszenie ciągle się rozwijamy i potrzebujemy nowych narzędzi i funkcjonalności do codziennej pracy. Aktualna forma strony jest wynikiem ponad 3 lat działalności jako Code for Poznań.",
    tags: ["Vue.js", "Vuex", "Vuetify", "Flask"],
    link: "https://github.com/CodeForPoznan/codeforpoznan.pl_v3",
    image: "https://codeforpoznan.pl/img/StronaSpolecznosci.8745bd44.png",
  },
  {
    id: "07",
    name: "Alinka",
    date: "Jan 2024",
    desc: "Aplikacja desktopowa usprawniająca codzienną pracę i tworzenie dokumentacji w poradniach psychologiczno-pedagogicznych.",
    longDesc:
      "Alinka to desktopowa aplikacja wspierająca codzienną pracę poradni psychologiczno-pedagogicznych. Pomaga uporządkować dane potrzebne do przygotowania dokumentacji oraz usprawnia tworzenie dokumentów związanych z wydawaniem opinii i orzeczeń. Aplikacja działa lokalnie, korzysta z bazy SQLite i automatyzuje generowanie dokumentów, a także wspiera pobieranie danych z zewnętrznych rejestrów, takich jak RSPO.",
    tags: ["Python", "PySide6", "SQLAlchemy", "Alembic", "SQLite"],
    link: "https://github.com/CodeForPoznan/alinka-pyside",
    image: "https://codeforpoznan.pl/img/alinka.eb7eb1b9.png",
  },
  {
    id: "08",
    name: "Fleet Manager",
    date: "Jan 2024",
    desc: "System logistyczny stworzony z Polską Akcją Humanitarną do ewidencji przejazdów i optymalizacji kosztów misji na świecie.",
    longDesc:
      "W wyniku współpracy z Polską Akcją Humanitarną stworzyliśmy aplikację pomagającą w logistycznych procesach akcji humanitarnych w różnych częściach globu. Aktualnie aplikacja służąca rejestracji i ewidencji przejazdów jest wykorzystywana podczas akcji humanitarnych na Ukrainie, w Sudanie Południowym, Jemenie oraz Somalii. Aplikacja pozwala także na eksport zebranych danych w celu ewidencji kosztów dla danej akcji humanitarnej. Dzięki temu możemy zoptymalizować proces i zmniejszyć nakład papierkowej pracy biurowej.",
    tags: ["React.js", "Django"],
    link: "https://github.com/CodeForPoznan/pah-fm",
    image: "https://watchit.org.pl/wp-content/uploads/2017/05/pah-logo.png",
  },
]

export default projects
