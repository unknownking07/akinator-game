import { GameData } from '@/types/game'

export const gameData: GameData = {
  people: [
    // Richest People
    {
      id: 'elon_musk',
      name: 'Elon Musk',
      category: 'Tech Billionaire',
      emoji: '🚀',
      attributes: {
        isBillionaire: true,
        isTechCEO: true,
        ownsSpaceCompany: true,
        ownsCarCompany: true,
        isOnTwitter: true,
        isMale: true,
        bornIn1970s: true,
        isSouthAfrican: true,
        ownsSocialMedia: true,
        isEuropean: false,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: false,
        isUnder30: false,
        isOver50: false
      }
    },
    {
      id: 'jeff_bezos',
      name: 'Jeff Bezos',
      category: 'Tech Billionaire',
      emoji: '📦',
      attributes: {
        isBillionaire: true,
        isTechCEO: true,
        ownsSpaceCompany: true,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1960s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        foundedAmazon: true,
        isEuropean: false,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: false,
        isUnder30: false,
        isOver50: true
      }
    },
    {
      id: 'bill_gates',
      name: 'Bill Gates',
      category: 'Tech Billionaire',
      emoji: '💻',
      attributes: {
        isBillionaire: true,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1950s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        foundedMicrosoft: true,
        isEuropean: false,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: false,
        isUnder30: false,
        isOver50: true
      }
    },

    // Crypto Founders (Base/Coinbase)
    {
      id: 'brian_armstrong',
      name: 'Brian Armstrong',
      category: 'Crypto CEO',
      emoji: '₿',
      attributes: {
        isBillionaire: true,
        isTechCEO: true,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1980s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        foundedCoinbase: true,
        isCryptoFounder: true,
        isEuropean: false,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: false,
        isUnder30: false,
        isOver50: false
      }
    },
    {
      id: 'jesse_pollak',
      name: 'Jesse Pollak',
      category: 'Base Creator',
      emoji: '🔵',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1980s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        foundedCoinbase: false,
        isCryptoFounder: true,
        createdBase: true,
        isEuropean: false,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: false,
        isUnder30: false,
        isOver50: false
      }
    },

    // YouTubers
    {
      id: 'mrbeast',
      name: 'MrBeast',
      category: 'YouTuber',
      emoji: '🎬',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1990s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        isYouTuber: true,
        hasMillionsOfSubs: true,
        isEuropean: false,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: true,
        isUnder30: true,
        isOver50: false
      }
    },
    {
      id: 'pewdiepie',
      name: 'PewDiePie',
      category: 'YouTuber',
      emoji: '🎮',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1980s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        isYouTuber: true,
        hasMillionsOfSubs: true,
        isSwedish: true,
        isEuropean: true,
        speaksEnglish: true,
        isEntrepreneur: true,
        appearsInMovies: false,
        isUnder30: false,
        isOver50: false
      }
    },

    // Footballers
    {
      id: 'messi',
      name: 'Lionel Messi',
      category: 'Footballer',
      emoji: '⚽',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1980s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        isFootballer: true,
        wonWorldCup: true,
        isArgentinian: true,
        isEuropean: false,
        speaksEnglish: false,
        isEntrepreneur: false,
        appearsInMovies: true,
        isUnder30: false,
        isOver50: false
      }
    },
    {
      id: 'ronaldo',
      name: 'Cristiano Ronaldo',
      category: 'Footballer',
      emoji: '👑',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: true,
        isMale: true,
        bornIn1980s: true,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        isFootballer: true,
        wonWorldCup: false,
        isPortuguese: true,
        isEuropean: true,
        speaksEnglish: false,
        isEntrepreneur: true,
        appearsInMovies: true,
        isUnder30: false,
        isOver50: false
      }
    },

    // Anime Characters
    {
      id: 'goku',
      name: 'Son Goku',
      category: 'Anime Character',
      emoji: '🥋',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: false,
        isMale: true,
        bornIn1980s: false,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        isAnimeCharacter: true,
        isFictional: true,
        hasSuperpowers: true,
        isFromDragonBall: true,
        isEuropean: false,
        speaksEnglish: false,
        isEntrepreneur: false,
        appearsInMovies: true,
        isUnder30: false,
        isOver50: false
      }
    },
    {
      id: 'naruto',
      name: 'Naruto Uzumaki',
      category: 'Anime Character',
      emoji: '🍜',
      attributes: {
        isBillionaire: false,
        isTechCEO: false,
        ownsSpaceCompany: false,
        ownsCarCompany: false,
        isOnTwitter: false,
        isMale: true,
        bornIn1980s: false,
        isSouthAfrican: false,
        ownsSocialMedia: false,
        isAnimeCharacter: true,
        isFictional: true,
        hasSuperpowers: true,
        isNinja: true,
        isEuropean: false,
        speaksEnglish: false,
        isEntrepreneur: false,
        appearsInMovies: true,
        isUnder30: true,
        isOver50: false
      }
    }
  ],

  questions: [
    {
      id: 'is_real_person',
      text: 'Is this person real (not fictional)?',
      attribute: 'isFictional',
      expectedValue: false
    },
    {
      id: 'is_male',
      text: 'Is this person male?',
      attribute: 'isMale',
      expectedValue: true
    },
    {
      id: 'is_billionaire',
      text: 'Is this person a billionaire?',
      attribute: 'isBillionaire',
      expectedValue: true
    },
    {
      id: 'is_tech_ceo',
      text: 'Is this person a tech company CEO?',
      attribute: 'isTechCEO',
      expectedValue: true
    },
    {
      id: 'owns_space_company',
      text: 'Does this person own a space exploration company?',
      attribute: 'ownsSpaceCompany',
      expectedValue: true
    },
    {
      id: 'owns_car_company',
      text: 'Does this person own an electric car company?',
      attribute: 'ownsCarCompany',
      expectedValue: true
    },
    {
      id: 'is_youtuber',
      text: 'Is this person a famous YouTuber?',
      attribute: 'isYouTuber',
      expectedValue: true
    },
    {
      id: 'is_footballer',
      text: 'Is this person a professional footballer?',
      attribute: 'isFootballer',
      expectedValue: true
    },
    {
      id: 'is_anime_character',
      text: 'Is this person an anime character?',
      attribute: 'isAnimeCharacter',
      expectedValue: true
    },
    {
      id: 'has_superpowers',
      text: 'Does this character have supernatural powers?',
      attribute: 'hasSuperpowers',
      expectedValue: true
    },
    {
      id: 'won_world_cup',
      text: 'Has this person won a FIFA World Cup?',
      attribute: 'wonWorldCup',
      expectedValue: true
    },
    {
      id: 'is_crypto_founder',
      text: 'Is this person involved in cryptocurrency/blockchain?',
      attribute: 'isCryptoFounder',
      expectedValue: true
    },
    {
      id: 'founded_microsoft',
      text: 'Did this person co-found Microsoft?',
      attribute: 'foundedMicrosoft',
      expectedValue: true
    },
    {
      id: 'founded_amazon',
      text: 'Did this person found Amazon?',
      attribute: 'foundedAmazon',
      expectedValue: true
    },
    {
      id: 'founded_coinbase',
      text: 'Did this person co-found Coinbase?',
      attribute: 'foundedCoinbase',
      expectedValue: true
    },
    {
      id: 'created_base',
      text: 'Did this person create the Base blockchain?',
      attribute: 'createdBase',
      expectedValue: true
    },
    {
      id: 'born_1970s',
      text: 'Was this person born in the 1970s?',
      attribute: 'bornIn1970s',
      expectedValue: true
    },
    {
      id: 'born_1980s',
      text: 'Was this person born in the 1980s?',
      attribute: 'bornIn1980s',
      expectedValue: true
    },
    {
      id: 'born_1990s',
      text: 'Was this person born in the 1990s?',
      attribute: 'bornIn1990s',
      expectedValue: true
    },
    {
      id: 'is_south_african',
      text: 'Is this person from South Africa?',
      attribute: 'isSouthAfrican',
      expectedValue: true
    },
    {
      id: 'is_european',
      text: 'Is this person from Europe?',
      attribute: 'isEuropean',
      expectedValue: true
    },
    {
      id: 'speaks_english',
      text: 'Does this person primarily speak English?',
      attribute: 'speaksEnglish',
      expectedValue: true
    },
    {
      id: 'has_social_media',
      text: 'Is this person very active on social media?',
      attribute: 'isOnTwitter',
      expectedValue: true
    },
    {
      id: 'is_entrepreneur',
      text: 'Is this person known as an entrepreneur?',
      attribute: 'isEntrepreneur',
      expectedValue: true
    },
    {
      id: 'appears_in_movies',
      text: 'Has this person appeared in movies or TV shows?',
      attribute: 'appearsInMovies',
      expectedValue: true
    },
    {
      id: 'is_under_30',
      text: 'Is this person under 30 years old?',
      attribute: 'isUnder30',
      expectedValue: true
    },
    {
      id: 'is_over_50',
      text: 'Is this person over 50 years old?',
      attribute: 'isOver50',
      expectedValue: true
    }
  ]
}