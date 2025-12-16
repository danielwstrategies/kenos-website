import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'

// Entertainment interviews content from kenosrestaurant.com
// Slugs match original URLs for SEO continuity
const entertainmentInterviews = [
  {
    title: 'Exclusive Q&A Interview with Reverend Doctor',
    slug: 'exclusive-q-and-a-interview-with-reverend-doctor',
    category: 'entertainment',
    publishedDate: '2024-01-15T12:00:00.000Z',
    excerpt: 'A dynamic performer blending various genres, Reverend Doctor talks about his musical beginnings, collaborations, and the rewarding aspects of connecting with audiences.',
    content: [
      {
        children: [
          { text: 'Reverend Doctor brings a dynamic, genre-blending performance style to the Keno\'s Lounge. We sat down for an exclusive interview to learn about his unique approach to music.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Your style is quite unique. How would you describe it?' }] },
      {
        children: [
          { text: 'I blend various genres - rock, soul, blues, and more - into something that\'s distinctly mine. Music shouldn\'t be confined to boxes. When you mix different influences, you create something fresh that can surprise and delight audiences.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Tell us about your collaborations.' }] },
      {
        children: [
          { text: 'Collaboration is at the heart of great music. I\'ve been fortunate to work with incredibly talented musicians over the years. Each collaboration teaches me something new and helps me grow as an artist. The chemistry you build with other musicians translates directly to the energy you bring on stage.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What\'s most rewarding about performing?' }] },
      {
        children: [
          { text: 'Connecting with audiences through diverse musical styles is incredibly rewarding. When you see someone nodding along, tapping their feet, or singing along - that connection is why I do this. At Keno\'s, that connection happens every single night.' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'rock' }, { tag: 'blues' }],
  },
  {
    title: 'Interview with Audio Avenues Band',
    slug: 'interview-with-audio-avenues-band',
    category: 'entertainment',
    publishedDate: '2024-02-10T12:00:00.000Z',
    excerpt: 'Audio Avenues brings their signature sound to Keno\'s Lounge. We spoke with the band about their musical journey and what makes performing at Keno\'s special.',
    content: [
      {
        children: [
          { text: 'Audio Avenues has become a favorite at Keno\'s Lounge with their versatile repertoire and engaging performances. We caught up with the band to learn more about their story.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Tell us about Audio Avenues.' }] },
      {
        children: [
          { text: 'We\'re a group of musicians who came together through our shared love of great music. Our name reflects our approach - we explore different musical avenues and bring them all together in our performances. Whether it\'s classic rock, soul, or contemporary hits, we love keeping the audience engaged.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What do you enjoy about performing at Keno\'s?' }] },
      {
        children: [
          { text: 'The atmosphere at Keno\'s is unlike anywhere else. The audience is always ready to have a good time, and the staff treats us like family. It\'s the perfect venue for the kind of music we play - intimate enough to connect with everyone, but lively enough to really get things going.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Catch Audio Avenues at Keno\'s Lounge for an unforgettable evening of music!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'band' }, { tag: 'live music' }],
  },
  {
    title: 'Interview with Clif Miller from CME Band',
    slug: 'interview-with-clif-miller-from-cme-band',
    category: 'entertainment',
    publishedDate: '2024-02-25T12:00:00.000Z',
    excerpt: 'Clif Miller of CME Band shares insights about the band\'s history, their musical influences, and what keeps them coming back to perform at Keno\'s.',
    content: [
      {
        children: [
          { text: 'CME Band has been entertaining crowds for years with their tight harmonies and energetic performances. We spoke with Clif Miller about the band\'s journey.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How did CME Band get started?' }] },
      {
        children: [
          { text: 'We started as a group of friends who loved jamming together. Over time, what began as casual sessions turned into something more serious. We realized we had something special and decided to take it on the road. Years later, here we are, still loving every minute of it.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What keeps you coming back to Keno\'s?' }] },
      {
        children: [
          { text: 'Keno\'s has become like a second home for us. The energy in the room is always electric, and the regulars have become friends. There\'s something special about a venue where the audience knows the songs and sings along. That\'s what you get at Keno\'s every time.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Experience CME Band live at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'band' }, { tag: 'CME' }],
  },
  {
    title: 'Entertainment Interview with Diana Drake',
    slug: 'entertainment-interview-with-diana-drake',
    category: 'entertainment',
    publishedDate: '2024-03-05T12:00:00.000Z',
    excerpt: 'A versatile performer with a background in modeling and songwriting, Diana shares her experiences from being a Playboy bunny to leading her trio, Diana Drake By Design.',
    content: [
      {
        children: [
          { text: 'Diana Drake is a versatile performer with a fascinating background spanning modeling, songwriting, and leading her own musical trio, Diana Drake By Design. We sat down with Diana to learn more about her journey.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Tell us about your background in entertainment.' }] },
      {
        children: [
          { text: 'My journey has been quite eclectic! I\'ve worked as a Playboy bunny, pursued modeling, and developed my passion for songwriting along the way. All of these experiences have shaped the performer I am today. Leading Diana Drake By Design allows me to bring all these elements together.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What do you love about performing at Keno\'s?' }] },
      {
        children: [
          { text: 'I emphasize the importance of enhancing the dining experience through tailored song selections. At Keno\'s, the atmosphere is perfect for creating those special moments. The crowd is always appreciative, and there\'s a wonderful synergy between the food, drinks, and music.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Catch Diana Drake performing in the Keno\'s Lounge and experience her unique blend of entertainment firsthand!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'lounge' }, { tag: 'live music' }],
  },
  {
    title: 'Q&A with Vince Portillo from Stripped',
    slug: 'q-and-a-with-vince-portillo-from-stripped',
    category: 'entertainment',
    publishedDate: '2024-03-18T12:00:00.000Z',
    excerpt: 'Vince Portillo from the acoustic duo Stripped discusses their unique approach to music and what makes their performances at Keno\'s so memorable.',
    content: [
      {
        children: [
          { text: 'Stripped brings an intimate, acoustic experience to Keno\'s Lounge. We spoke with Vince Portillo about the duo\'s approach to music and performance.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What is the concept behind Stripped?' }] },
      {
        children: [
          { text: 'The name says it all - we strip songs down to their essence. No elaborate production, just pure music. It\'s about the song itself, the lyrics, the melody. When you remove all the extras, you really hear the heart of the music. That\'s what we bring to every performance.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Why does the acoustic format work so well at Keno\'s?' }] },
      {
        children: [
          { text: 'Keno\'s has this incredible intimate atmosphere that\'s perfect for acoustic music. People come to enjoy great food, drinks, and conversation. Our stripped-down sound complements that experience rather than overwhelming it. You can have a conversation and still appreciate the music.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Experience the acoustic magic of Stripped at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'acoustic' }, { tag: 'duo' }],
  },
  {
    title: 'Q&A with Saxophone Player Rob Verdi',
    slug: 'q-and-a-with-saxophone-player-rob-verdi',
    category: 'entertainment',
    publishedDate: '2024-04-02T12:00:00.000Z',
    excerpt: 'A seasoned saxophonist with over 38 years at Disneyland, Rob discusses his passion for traditional jazz and his approach to engaging audiences by taking song requests.',
    content: [
      {
        children: [
          { text: 'Rob Verdi brings over 38 years of experience as a saxophonist, including an impressive tenure at Disneyland. His passion for traditional jazz and audience engagement makes every performance at Keno\'s memorable.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'You\'ve performed at Disneyland for over 38 years. What keeps you passionate about music?' }] },
      {
        children: [
          { text: 'Traditional jazz is my true love. There\'s something timeless about it that connects with people across generations. The magic of live music is that each performance is unique, and I still get excited before every show.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How do you engage with the audience at Keno\'s?' }] },
      {
        children: [
          { text: 'I love taking song requests, especially ones that hold personal significance to guests. When someone requests a song from their wedding, their parents\' favorite tune, or a melody that brings back special memories - that\'s when the real magic happens.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Experience Rob Verdi\'s soulful saxophone in the Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'jazz' }, { tag: 'saxophone' }],
  },
  {
    title: 'Q&A Interview with Duke Paul',
    slug: 'q-and-a-interview-with-duke-paul',
    category: 'entertainment',
    publishedDate: '2024-04-15T12:00:00.000Z',
    excerpt: 'Duke Paul shares his musical journey, influences, and what makes performing at Keno\'s Lounge a special experience for both him and the audience.',
    content: [
      {
        children: [
          { text: 'Duke Paul has been captivating audiences with his soulful performances at Keno\'s Lounge. We sat down with Duke to learn about his musical journey.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Who are your musical influences?' }] },
      {
        children: [
          { text: 'I grew up listening to the greats - Sinatra, Nat King Cole, Dean Martin. The Rat Pack era really shaped my approach to music and performance. There\'s an elegance to that style that I try to bring to every show. But I also appreciate more contemporary artists who carry on that tradition.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What makes Keno\'s special for you?' }] },
      {
        children: [
          { text: 'Keno\'s has that old Vegas vibe that\'s perfect for the kind of music I perform. The lounge setting, the appreciative crowd, the quality of the food and drinks - it all comes together to create something special. It feels like stepping back in time to when lounge entertainment was king.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Catch Duke Paul at Keno\'s Lounge for an evening of classic entertainment!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'lounge' }, { tag: 'classics' }],
  },
  {
    title: 'Interview with Gregville Music',
    slug: 'interview-with-gregville-music',
    category: 'entertainment',
    publishedDate: '2024-05-01T12:00:00.000Z',
    excerpt: 'Greg shares his journey from classical music lessons to performing easy listening tunes, highlighting the welcoming atmosphere of Keno\'s and his availability for private events.',
    content: [
      {
        children: [
          { text: 'Gregville Music brings a refined touch to the Keno\'s Lounge with his easy listening repertoire. We caught up with Greg to learn about his musical background.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How did you get started in music?' }] },
      {
        children: [
          { text: 'I began with classical music lessons as a child. The discipline and technique I learned then still form the foundation of my playing today. Over time, I developed a love for easy listening tunes - the kind of music that creates a warm, welcoming atmosphere for dining and conversation.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What makes Keno\'s special for you?' }] },
      {
        children: [
          { text: 'The welcoming atmosphere at Keno\'s is second to none. The staff treats us like family, and the guests are always appreciative. It\'s the perfect venue for my style of music - sophisticated but accessible, relaxing but engaging.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Greg is also available for private events! Catch Gregville Music in the Keno\'s Lounge or inquire about booking for your special occasion.' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'easy listening' }, { tag: 'private events' }],
  },
  {
    title: 'Interview with Nicki Sage',
    slug: 'interview-with-nicki-sage',
    category: 'entertainment',
    publishedDate: '2024-05-15T12:00:00.000Z',
    excerpt: 'A classically trained musician turned pop artist, Nicki discusses her evolution in the music industry, her commitment to full-time entertainment, and her upcoming projects.',
    content: [
      {
        children: [
          { text: 'Nicki Sage brings classical training and pop sensibility together in her captivating performances at Keno\'s. We spoke with Nicki about her evolution as an artist.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'You have a classical background but perform pop. Tell us about that journey.' }] },
      {
        children: [
          { text: 'Classical training gave me a strong foundation - understanding music theory, developing vocal technique, and learning discipline. But pop music is where my heart led me. I\'ve evolved in the music industry by blending those classical elements with contemporary styles.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Any upcoming projects you can share?' }] },
      {
        children: [
          { text: 'I\'m working on releasing new music soon, and there\'s a television series in development that I\'m really excited about. Stay tuned! But in the meantime, catch me performing at Keno\'s Lounge where I get to do what I love most.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Experience Nicki Sage live at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'pop' }, { tag: 'classical' }],
  },
  {
    title: 'Interview with Marcella Werre',
    slug: 'interview-with-marcella-werre',
    category: 'entertainment',
    publishedDate: '2024-06-01T12:00:00.000Z',
    excerpt: 'Marcella Werre brings her powerful vocals and captivating stage presence to Keno\'s Lounge. She shares her musical journey and what inspires her performances.',
    content: [
      {
        children: [
          { text: 'Marcella Werre has been lighting up Keno\'s Lounge with her powerful vocals and engaging performances. We had the pleasure of speaking with her about her musical journey.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How did you discover your passion for singing?' }] },
      {
        children: [
          { text: 'Music has been part of my life for as long as I can remember. I started singing in church as a child, and that\'s where I developed my love for connecting with an audience through song. Every performance is an opportunity to share that connection with others.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What do you love about performing at Keno\'s?' }] },
      {
        children: [
          { text: 'The intimacy of the lounge setting is perfect for the kind of connection I love to create with audiences. At Keno\'s, you\'re not just performing for a crowd - you\'re sharing an experience with friends. The energy is always positive, and the regulars have become like family.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Don\'t miss Marcella Werre performing at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'vocals' }, { tag: 'lounge' }],
  },
  {
    title: 'Interview with Country Singer Matt Koerner',
    slug: 'interview-with-country-singer-matt-koerner',
    category: 'entertainment',
    publishedDate: '2024-06-15T12:00:00.000Z',
    excerpt: 'Country singer Matt Koerner brings authentic country music to Keno\'s Lounge. He shares his Nashville experiences and what draws him to perform at Keno\'s.',
    content: [
      {
        children: [
          { text: 'Matt Koerner brings the heart and soul of country music to Keno\'s Lounge. We spoke with Matt about his journey from aspiring musician to beloved performer.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Tell us about your country music journey.' }] },
      {
        children: [
          { text: 'I grew up on country music - it was always playing in our house. I spent time in Nashville pursuing my dreams, learning from incredible musicians, and really honing my craft. Those experiences shaped who I am as a performer today. Country music tells stories, and I love being the one to share those stories.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What brings you to Keno\'s?' }] },
      {
        children: [
          { text: 'Keno\'s has a warmth that reminds me of the honky-tonks back in Nashville. The audience here appreciates authentic music and genuine performance. Plus, the staff and management really take care of their entertainers. It feels like home.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Experience Matt Koerner\'s authentic country sound at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'country' }, { tag: 'Nashville' }],
  },
  {
    title: 'Interview with Funk Station',
    slug: 'interview-with-funk-station',
    category: 'entertainment',
    publishedDate: '2024-07-01T12:00:00.000Z',
    excerpt: 'Funk Station brings the groove to Keno\'s Lounge with their infectious energy and danceable beats. The band shares what makes their performances unforgettable.',
    content: [
      {
        children: [
          { text: 'Funk Station has been getting Keno\'s Lounge on their feet with their irresistible grooves. We caught up with the band to talk about bringing the funk to Orange County.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What is the Funk Station philosophy?' }] },
      {
        children: [
          { text: 'Simple - make people move! Funk music is all about the groove, that irresistible feeling that gets you out of your seat. We draw from the classics - Parliament, Earth Wind & Fire, James Brown - but we make it our own. Our goal is to create an experience, not just a performance.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How does Keno\'s audience respond to funk?' }] },
      {
        children: [
          { text: 'They love it! There\'s something universal about funk music - it doesn\'t matter your age or background, when that groove hits, you feel it. The dance floor at Keno\'s gets packed when we play. Seeing people let loose and have a great time is what it\'s all about.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Get funky with Funk Station at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'funk' }, { tag: 'dance' }],
  },
  {
    title: 'Meet Lounge Singer Gary Hughes',
    slug: 'meet-lounge-singer-gary-hughes',
    category: 'entertainment',
    publishedDate: '2024-07-15T12:00:00.000Z',
    excerpt: 'Known for his soulful renditions of R&B classics, Gary reflects on his transition from band performances to solo acts and the joy of performing duets with his wife, Sondra.',
    content: [
      {
        children: [
          { text: 'Gary Hughes is known for his soulful renditions of R&B classics that get the Keno\'s Lounge moving. We spoke with Gary about his musical journey.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Tell us about your musical journey.' }] },
      {
        children: [
          { text: 'I started with band performances, but over time I transitioned to solo acts. Going solo allows me more flexibility and a more intimate connection with the audience. But the best part is when my wife Sondra joins me for duets - those are always crowd favorites!' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What\'s your favorite part about performing at Keno\'s?' }] },
      {
        children: [
          { text: 'The atmosphere here is unmatched. The regulars know all the songs, new guests get swept up in the energy, and there\'s a real sense of community. When Sondra and I perform together, you can feel the love in the room.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Don\'t miss Gary Hughes and the occasional duet performances with Sondra in the Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'R&B' }, { tag: 'soul' }],
  },
  {
    title: 'Interview with Lounge Performer The Real Diva Karen Cobb',
    slug: 'interview-with-lounge-performer-the-real-diva-karen-cobb',
    category: 'entertainment',
    publishedDate: '2024-08-01T12:00:00.000Z',
    excerpt: 'The Real Diva Karen Cobb brings showstopping performances to Keno\'s Lounge. She shares her journey and what makes her shows truly unforgettable.',
    content: [
      {
        children: [
          { text: 'Karen Cobb, known as The Real Diva, has been dazzling audiences at Keno\'s Lounge with her powerhouse vocals and captivating stage presence. We sat down with Karen to learn about her remarkable career.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How did you become "The Real Diva"?' }] },
      {
        children: [
          { text: 'The name came from audiences over the years! I\'ve always believed in giving everything I have in every performance. If you\'re going to be on that stage, be all the way there. The "diva" title is really about the commitment to excellence and giving the audience an unforgettable experience.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What do you love about Keno\'s?' }] },
      {
        children: [
          { text: 'Keno\'s appreciates showmanship. The audience here comes ready to be entertained, and I come ready to deliver. There\'s an energy exchange that happens in that room that\'s hard to describe - you just have to experience it. Plus, the food is incredible!' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Experience The Real Diva Karen Cobb at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'diva' }, { tag: 'showstopper' }],
  },
  {
    title: 'Interview with Country and Easy Listening Musician John Nichols',
    slug: 'interview-with-country-and-easy-listening-musician-john-nichols',
    category: 'entertainment',
    publishedDate: '2024-08-15T12:00:00.000Z',
    excerpt: 'John Nichols blends country and easy listening for a unique sound that\'s perfect for Keno\'s Lounge. He shares his musical philosophy and favorite performance moments.',
    content: [
      {
        children: [
          { text: 'John Nichols brings a unique blend of country and easy listening music to Keno\'s Lounge. We spoke with John about his musical approach and what keeps him passionate about performing.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'How would you describe your musical style?' }] },
      {
        children: [
          { text: 'I call it "relaxed country" - it has the storytelling and authenticity of country music, but with a smoother, easier listening feel. It\'s the kind of music that works perfectly for a dinner setting while still having enough substance to really engage listeners who are paying attention.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What\'s your favorite part about performing at Keno\'s?' }] },
      {
        children: [
          { text: 'The connection with the audience. At Keno\'s, people are there to enjoy themselves, and music is a big part of that experience. I love when someone comes up after a show and says a particular song meant something to them. Those moments remind me why I do this.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Enjoy John Nichols\' relaxed country sounds at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'country' }, { tag: 'easy listening' }],
  },
  {
    title: 'Interview with Lounge Performer Benny Chadwick',
    slug: 'interview-with-lounge-performer-benny-chadwick',
    category: 'entertainment',
    publishedDate: '2024-09-01T12:00:00.000Z',
    excerpt: 'Benny Chadwick brings classic lounge entertainment to life at Keno\'s. He shares his love for the golden age of lounge music and what makes his performances special.',
    content: [
      {
        children: [
          { text: 'Benny Chadwick embodies the spirit of classic lounge entertainment at Keno\'s. We caught up with Benny to discuss his passion for keeping the lounge tradition alive.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'What draws you to lounge music?' }] },
      {
        children: [
          { text: 'There\'s an elegance to lounge music that\'s timeless. The songs from the \'50s, \'60s, and \'70s - they have a sophistication and emotion that really speaks to people. I love keeping that tradition alive while making it feel fresh and relevant for today\'s audiences.' }
        ]
      },
      { children: [{ text: '' }] },
      { type: 'h3', children: [{ text: 'Why is Keno\'s the perfect venue for your style?' }] },
      {
        children: [
          { text: 'Keno\'s has that authentic lounge atmosphere that\'s increasingly rare. The décor, the vibe, the way the room is set up - it all transports you to another era. When I perform there, it feels like I\'m exactly where lounge music is meant to be enjoyed.' }
        ]
      },
      { children: [{ text: '' }] },
      {
        children: [
          { text: 'Step back in time with Benny Chadwick at Keno\'s Lounge!' }
        ]
      }
    ],
    author: "Keno's Restaurant",
    tags: [{ tag: 'entertainment' }, { tag: 'interview' }, { tag: 'lounge' }, { tag: 'classics' }],
  },
]

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const results: any = {
      created: [],
      skipped: [],
      errors: [],
    }

    for (const post of entertainmentInterviews) {
      try {
        // Check if post already exists
        const existing = await payload.find({
          collection: 'blog-posts',
          where: { slug: { equals: post.slug } },
        })

        if (existing.docs.length > 0) {
          results.skipped.push({ title: post.title, reason: 'Already exists' })
          continue
        }

        // Create the blog post
        const created = await payload.create({
          collection: 'blog-posts',
          data: {
            title: post.title,
            slug: post.slug,
            category: post.category,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            tags: post.tags,
            publishedDate: post.publishedDate,
            status: 'published',
          } as any,
        })

        results.created.push({ title: post.title, id: created.id })
      } catch (error: any) {
        results.errors.push({ title: post.title, error: error.message })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Blog posts seeded! Created: ${results.created.length}, Skipped: ${results.skipped.length}, Errors: ${results.errors.length}`,
      results,
    })
  } catch (error: any) {
    console.error('Error seeding blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to seed blog posts', details: error.message },
      { status: 500 }
    )
  }
}
