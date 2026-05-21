import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = ["Home", "Rooms", "Amenities", "Gallery", "Offers", "Policies", "Testimonials", "Register", "Contact"];

const ROOMS = [
  { id: 1, name: "Deluxe King Room", price: 320, size: "48 m²", floor: "5–8", capacity: 2, category: "Deluxe", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", amenities: ["🛏 King Bed", "🛁 Jacuzzi", "🌄 City View", "📶 WiFi", "❄️ AC", "📺 4K TV"], desc: "An elegant retreat featuring hand-stitched linens, a deep-soak Jacuzzi, and sweeping city vistas from floor-to-ceiling glass." },
  { id: 2, name: "Ocean Suite", price: 580, size: "72 m²", floor: "10–14", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", amenities: ["🛏 King Bed", "🌊 Ocean View", "🍾 Mini Bar", "🛁 Soaking Tub", "🛎 Butler"], desc: "Wake to the sound of waves. A private terrace, curated minibar, and panoramic ocean views define this signature suite." },
  { id: 3, name: "Presidential Villa", price: 1200, size: "180 m²", floor: "18–20", capacity: 4, category: "Villa", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", amenities: ["🛏 2 Bedrooms", "🏊 Private Pool", "🍽 Butler", "🚗 Chauffeur", "🎵 Sound System"], desc: "The pinnacle of luxury. A dedicated butler, private plunge pool, and 24-hour chauffeur ensure unmatched exclusivity." },
  { id: 4, name: "Garden Bungalow", price: 410, size: "65 m²", floor: "Ground", capacity: 2, category: "Bungalow", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", amenities: ["🌿 Garden View", "🛁 Rain Shower", "☕ Espresso Bar", "📶 WiFi", "🌺 Private Garden"], desc: "Nestled among manicured gardens, this serene bungalow offers direct garden access and a rainfall outdoor shower." },
  { id: 5, name: "Sky Penthouse", price: 950, size: "140 m²", floor: "Top Floor", capacity: 3, category: "Penthouse", img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80", amenities: ["🏙 360° View", "🛏 King Bed", "🍾 Welcome Kit", "🛁 Spa Bath", "🍳 Kitchenette"], desc: "Above the clouds, this penthouse commands a 360-degree horizon, perfect for those who demand nothing less than the top." },
  { id: 6, name: "Classic Double", price: 195, size: "36 m²", floor: "2–4", capacity: 2, category: "Classic", img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80", amenities: ["🛏 Double Beds", "📺 Smart TV", "☕ Coffee Maker", "📶 WiFi", "🪟 City View"], desc: "Thoughtfully appointed with modern comforts, this room is the ideal base for business or leisure travelers." },
  { id: 7, name: "Honeymoon Terrace", price: 760, size: "95 m²", floor: "12–15", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", amenities: ["🛏 King Canopy Bed", "🌹 Petal Turndown", "🍾 Champagne", "🛁 Couples Tub", "🌅 Sunset Terrace"], desc: "Designed for love. Rose petal turndown service, private sunset terrace, and a signature champagne welcome await." },
  { id: 8, name: "Lagoon Pool Villa", price: 1450, size: "220 m²", floor: "Ground", capacity: 4, category: "Villa", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", amenities: ["🏊 Private Lagoon", "🛏 2 Bedrooms", "🍽 Chef Service", "🚣 Kayak Access", "🌴 Beachfront"], desc: "Step from your villa directly into your private lagoon. A personal chef, kayaks, and direct beach access await." },
  { id: 9, name: "Heritage Loft", price: 490, size: "80 m²", floor: "3–5", capacity: 3, category: "Suite", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", amenities: ["🏛 Heritage Decor", "🛏 King Bed", "📚 Library Nook", "🪵 Exposed Brick", "☕ Pour-Over Bar"], desc: "A marriage of old-world character and contemporary luxury. Exposed brick, a curated library, and a specialty coffee bar." },
  { id: 10, name: "Cliff Edge Studio", price: 380, size: "55 m²", floor: "8–10", capacity: 2, category: "Studio", img: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80", amenities: ["🌊 Cliff View", "🛁 Open Bath", "🍳 Mini Kitchen", "🎨 Art Collection", "📶 WiFi"], desc: "Suspended above dramatic cliffs, this studio apartment blends an artisan aesthetic with breathtaking natural drama." },
  { id: 11, name: "Wellness Retreat Room", price: 550, size: "85 m²", floor: "6–9", capacity: 2, category: "Wellness", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", amenities: ["🧘 Yoga Corner", "🌿 Aromatherapy", "🥗 Wellness Menu", "🛁 Salt Bath", "🏋️ Private Gym"], desc: "A holistic sanctuary with a dedicated yoga corner, daily wellness menus, and an in-room salt therapy bath." },
  { id: 12, name: "Family Grand Suite", price: 680, size: "120 m²", floor: "4–7", capacity: 6, category: "Suite", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80", amenities: ["🛏 3 Bedrooms", "🧒 Kids Lounge", "🎮 Game Console", "🍳 Full Kitchen", "🛁 2 Bathrooms"], desc: "Spacious enough for the whole family. Three bedrooms, a dedicated kids lounge, and a full gourmet kitchen." },
  { id: 13, name: "Overwater Bungalow", price: 1100, size: "130 m²", floor: "Over Water", capacity: 2, category: "Bungalow", img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80", amenities: ["💧 Glass Floor Panel", "🛏 King Bed", "🚿 Open-Air Shower", "🐠 Snorkel Set", "🌅 Sunrise View"], desc: "Perched above the lagoon on stilts, a glass floor reveals colorful marine life below while you sleep." },
  { id: 14, name: "Artist's Studio", price: 340, size: "58 m²", floor: "Top Floor", capacity: 2, category: "Studio", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80", amenities: ["🎨 Skylight Atelier", "🖼 Original Art", "🛏 King Bed", "📷 Photography Kit", "☕ Brew Bar"], desc: "A light-flooded loft with a working atelier, skylight ceiling, and original artwork. For guests who see the world differently." },
  { id: 15, name: "Forest Treehouse", price: 620, size: "75 m²", floor: "Elevated", capacity: 2, category: "Treehouse", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", amenities: ["🌲 Treetop View", "🛏 King Bed", "🔥 Fireplace", "🦅 Bird Watching", "🪵 Wood Deck"], desc: "Nestled among ancient trees, this treehouse hideaway features a wood-burning fireplace and private observation deck." },
  { id: 16, name: "Desert Pavilion", price: 890, size: "110 m²", floor: "Ground", capacity: 4, category: "Pavilion", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", amenities: ["🏜 Desert View", "🏊 Plunge Pool", "🎆 Stargazing Deck", "🛏 2 Bedrooms", "🍸 Private Bar"], desc: "Under endless skies, this desert pavilion offers a private plunge pool and telescope for stargazing beneath the Milky Way." },
  { id: 17, name: "Arctic Lodge", price: 980, size: "100 m²", floor: "Ground", capacity: 2, category: "Lodge", img: "https://images.unsplash.com/photo-1533760881669-80db4d7b341c?w=800&q=80", amenities: ["❄️ Ice Architecture", "🔥 Wood Stove", "🌌 Northern Lights View", "🛏 Fur Bed", "🍷 Wine Cellar"], desc: "A crystalline ice lodge with fur-clad beds, a roaring wood stove, and front-row views of the aurora borealis." },
  { id: 18, name: "Rooftop Loft", price: 520, size: "90 m²", floor: "Top Floor", capacity: 2, category: "Loft", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", amenities: ["🏙 Skyline View", "🛁 Outdoor Hot Tub", "🛏 King Bed", "☀️ Sun Deck", "🎵 Sound System"], desc: "The city belongs to you from this rooftop loft with an outdoor hot tub, sun deck, and 360-degree skyline vistas." },
  { id: 19, name: "Vineyard Cottage", price: 460, size: "70 m²", floor: "Ground", capacity: 3, category: "Cottage", img: "https://images.unsplash.com/photo-1516788875874-c5912cae7b43?w=800&q=80", amenities: ["🍇 Vineyard View", "🍷 Wine Cellar Access", "🛏 King Bed", "🧺 Picnic Basket", "🌿 Herb Garden"], desc: "Set among sun-drenched vines, this romantic cottage includes a private wine cellar and daily vineyard picnic basket." },
  { id: 20, name: "Cave Suite", price: 740, size: "88 m²", floor: "Below Ground", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80", amenities: ["🪨 Cave Architecture", "🛁 Natural Spring Bath", "🕯 Candlelit Dining", "🛏 King Bed", "🧖 Spa"], desc: "Carved into volcanic rock, this extraordinary cave suite features natural thermal spring baths and candlelit dinners." },
  { id: 21, name: "Imperial Suite", price: 1350, size: "200 m²", floor: "Royal Floor", capacity: 4, category: "Suite", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", amenities: ["👑 Royal Décor", "🛏 California King", "🍽 Private Chef", "🎼 Grand Piano", "💎 Jewellery Safe"], desc: "Inspired by imperial palaces. A grand piano, private chef, and bespoke butler service make this the ultimate statement." },
  { id: 22, name: "Nomad Tent Suite", price: 390, size: "62 m²", floor: "Garden", capacity: 2, category: "Tent", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80", amenities: ["⛺ Luxury Tent", "🛏 Ortho Mattress", "🔥 Fire Pit", "🌟 Clear Ceiling", "🍳 Camp Chef"], desc: "Glamping elevated. A transparent roof for stargazing, a crackling fire pit, and gourmet camp cooking." },
  { id: 23, name: "Underwater Alcove", price: 2200, size: "95 m²", floor: "Below Sea", capacity: 2, category: "Alcove", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", amenities: ["🐟 360° Sea View", "🛏 King Bed", "🤿 Dive Access", "🌊 Submarine Service", "🍽 Diver-Chef"], desc: "The world's most exclusive address: 5 metres below the ocean surface. Watch manta rays glide past your bedroom window." },
  { id: 24, name: "Mountain Chalet", price: 570, size: "95 m²", floor: "Summit", capacity: 4, category: "Chalet", img: "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=800&q=80", amenities: ["🏔 Mountain View", "🔥 Stone Fireplace", "🎿 Ski Storage", "🛏 2 Bedrooms", "♨️ Sauna"], desc: "A classic alpine chalet with a stone fireplace, private sauna, and sweeping mountain panoramas from every window." },
  { id: 25, name: "Lotus Pool Room", price: 430, size: "68 m²", floor: "3–6", capacity: 2, category: "Pool", img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80", amenities: ["🌸 Pool Access", "🛏 King Bed", "🏊 Swim-Out", "🌺 Floral Bath", "🧴 Aromatherapy"], desc: "A swim-out access room where you step directly from your terrace into a lotus-scented garden pool." },
  { id: 26, name: "Glass Cube Suite", price: 820, size: "100 m²", floor: "12–16", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?w=800&q=80", amenities: ["🔲 Glass Walls", "🛏 Floating Bed", "🌆 City Panorama", "🧖 In-Room Spa", "🍷 Wine Fridge"], desc: "An architectural marvel — four glass walls, a floating king bed, and a full-service in-room spa with city panoramas." },
  { id: 27, name: "Safari Tent Villa", price: 680, size: "115 m²", floor: "Wilderness", capacity: 4, category: "Villa", img: "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=800&q=80", amenities: ["🦁 Wildlife View", "🛏 2 Beds", "🔭 Telescope", "🍖 BBQ Dinner", "🌅 Dawn Game Walk"], desc: "Fall asleep to the sounds of the wild. A telescope, dawn game walks, and fireside BBQ dinners under the stars." },
  { id: 28, name: "Romantic Alcove", price: 510, size: "76 m²", floor: "9–12", capacity: 2, category: "Romantic", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", amenities: ["🌹 Rose Décor", "🕯 Canopy Bed", "🍓 Strawberry Bar", "🎵 Curated Playlist", "💆 Couples Massage"], desc: "Every detail whispers romance. A canopy bed draped in silk, a private couples massage suite, and a strawberry bar." },
  { id: 29, name: "Sky Glass Villa", price: 1800, size: "250 m²", floor: "Top 2 Floors", capacity: 6, category: "Villa", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe2e6?w=800&q=80", amenities: ["🏙 Duplex Layout", "🏊 Indoor Pool", "🛏 3 Bedrooms", "🎬 Home Cinema", "🍽 Private Dining"], desc: "A two-floor private villa with an indoor pool, home cinema, three bedrooms, and private chef dining room." },
  { id: 30, name: "Lighthouse Keeper Suite", price: 650, size: "85 m²", floor: "Lighthouse Tower", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80", amenities: ["🏮 360° Lantern Room", "🛏 King Bed", "⚓ Nautical Décor", "🌊 Ocean Access", "🦞 Seafood Menu"], desc: "Perched in a historic lighthouse tower, this unique suite revolves around a working lantern room with ocean-to-horizon views." },
  { id: 31, name: "Celestial Dome", price: 1600, size: "160 m²", floor: "Observatory", capacity: 2, category: "Dome", img: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800&q=80", amenities: ["🔭 Observatory Dome", "🌌 Star Map Ceiling", "🛏 Floating Bed", "🍸 Constellation Bar", "📡 NASA Feed"], desc: "Sleep under a retractable dome ceiling. A custom constellation projection system and live NASA feed transform night into wonder." },
  { id: 32, name: "Bamboo Eco Villa", price: 440, size: "80 m²", floor: "Forest Ground", capacity: 3, category: "Eco", img: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80", amenities: ["♻️ Eco-Certified", "🌿 Solar Powered", "🛏 Bamboo Bed", "🌳 Forest Deck", "🥬 Organic Meals"], desc: "100% solar-powered, built from sustainable bamboo, and offering certified organic meals grown on-site. Luxury for the planet." },
];

const AMENITIES = [
  { icon: "♨️", name: "Infinity Spa", desc: "Rejuvenate with curated therapies and ancient rituals from five continents." },
  { icon: "🏊", name: "Rooftop Pool", desc: "Swim above the clouds with panoramic skyline views and poolside service." },
  { icon: "🏋️", name: "Fitness Center", desc: "State-of-the-art equipment and personal trainers available 24/7." },
  { icon: "🍽️", name: "Fine Dining", desc: "Michelin-starred cuisine crafted from locally-sourced, seasonal ingredients." },
  { icon: "🍸", name: "Sky Bar", desc: "Craft cocktails, rare spirits, and live jazz at the golden hour." },
  { icon: "🧘", name: "Yoga Pavilion", desc: "Morning and sunset sessions with world-class certified instructors." },
  { icon: "🚗", name: "Valet Parking", desc: "Complimentary valet, airport transfers, and helicopter arrivals." },
  { icon: "🛎️", name: "24H Concierge", desc: "Your personal concierge for every request, any hour of the day." },
  { icon: "🤿", name: "Water Sports", desc: "Diving, surfing, kayaking, and snorkeling with expert instructors." },
  { icon: "🎭", name: "Cultural Events", desc: "Nightly cultural performances, art installations, and private screenings." },
  { icon: "🍷", name: "Wine Cellar", desc: "6,000 curated labels across 14 wine-growing regions." },
  { icon: "🧒", name: "Kids Club", desc: "Supervised activities, nature trails, and creative workshops for children." },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=90",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=90",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe2e6?w=900&q=90",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=90",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=90",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=90",
  "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=900&q=90",
  "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=900&q=90",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=90",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=90",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=90",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=90",
  "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=900&q=90",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=90",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90",
  "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?w=900&q=90",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=90",
];

const OFFERS = [
  { title: "Honeymoon Bliss", emoji: "🌹", discount: "30% OFF", tag: "Most Popular", desc: "Roses, champagne, couples spa, and sunset dining on your private terrace.", original: 860, sale: 602, ends: 3, color: "#e85d8a", gradient: "linear-gradient(135deg, #e85d8a22, #d4af3711)" },
  { title: "Weekend Getaway", emoji: "✈️", discount: "20% OFF", tag: "Limited", desc: "Two nights in our Deluxe King with complimentary breakfast and city tour.", original: 640, sale: 512, ends: 5, color: "#5b8dee", gradient: "linear-gradient(135deg, #5b8dee22, #d4af3711)" },
  { title: "Summer Escape", emoji: "🌊", discount: "25% OFF", tag: "Summer Special", desc: "Ocean Suite with free airport pickup and snorkeling for stays of 3+ nights.", original: 1160, sale: 870, ends: 8, color: "#1ec8a0", gradient: "linear-gradient(135deg, #1ec8a022, #d4af3711)" },
  { title: "Wellness Retreat", emoji: "🧘", discount: "15% OFF", tag: "New", desc: "5-night wellness package: daily yoga, spa treatments, and a detox menu.", original: 2750, sale: 2338, ends: 12, color: "#a67cff", gradient: "linear-gradient(135deg, #a67cff22, #d4af3711)" },
];

const POLICIES = [
  { icon: "📅", title: "Cancellation Policy", type: "info", rules: ["Free cancellation up to 72 hours before check-in", "50% charge within 24–72 hours of check-in", "100% charge for no-shows or same-day cancellations", "Non-refundable rates are exempt from all waivers"] },
  { icon: "💳", title: "Payment Terms", type: "info", rules: ["Full payment required at booking for non-refundable rates", "25% deposit required for refundable bookings", "Balance due 72 hours before arrival", "All major cards, crypto, and bank transfer accepted"] },
  { icon: "⚠️", title: "Damage & Penalties", type: "warning", rules: ["Room damage assessed and billed at replacement cost", "Smoking violation: ₹25,000 fine + deep-cleaning fee", "Missing room items: billed at retail price + 20% handling", "Unauthorized pets: ₹10,000 penalty per night"] },
  { icon: "🚫", title: "Prohibited Activities", type: "danger", rules: ["No external catering or food delivery services", "No parties or events without prior written approval", "Quiet hours strictly enforced: 11 PM – 7 AM", "No recording in spa or private dining areas without consent"] },
  { icon: "✅", title: "Check-In / Check-Out", type: "success", rules: ["Check-in from 3:00 PM | Check-out by 12:00 PM", "Early check-in subject to availability (₹3,000 fee)", "Late check-out until 6 PM: 50% of nightly rate", "Luggage storage available 24 hours at no charge"] },
  { icon: "👑", title: "Loyalty & Privileges", type: "gold", rules: ["Gold Members: complimentary room upgrade when available", "Platinum Members: guaranteed suite upgrade on all stays", "Diamond Members: private arrival lounge + dedicated butler", "Points never expire; transferable to family members"] },
];

const TESTIMONIALS = [
  { name: "Amara Singh", role: "Travel Blogger", text: "Absolutely the finest stay of my life. Every detail was curated to perfection — the staff, the food, the suite.", rating: 5, img: "https://i.pravatar.cc/120?img=47", country: "🇮🇳 India" },
  { name: "James Whitfield", role: "CEO, Whitfield Co.", text: "I've stayed at over 200 luxury hotels worldwide. Aurum stands in a class of its own. We'll be back every year.", rating: 5, img: "https://i.pravatar.cc/120?img=11", country: "🇬🇧 United Kingdom" },
  { name: "Léa Fontaine", role: "Interior Designer", text: "The aesthetic is breathtaking — every corner is art. The rooftop pool at sunset is an experience I'll never forget.", rating: 5, img: "https://i.pravatar.cc/120?img=45", country: "🇫🇷 France" },
  { name: "Ravi Menon", role: "Film Director", text: "Shot part of our production here and the team went above and beyond. Exceptional hospitality.", rating: 5, img: "https://i.pravatar.cc/120?img=13", country: "🇮🇳 India" },
  { name: "Sofia Marchetti", role: "Luxury Editor, Vogue", text: "Three words: flawless, opulent, unforgettable. Aurum has set a new benchmark for what five-star really means.", rating: 5, img: "https://i.pravatar.cc/120?img=44", country: "🇮🇹 Italy" },
  { name: "Chen Wei", role: "Tech Entrepreneur", text: "The Presidential Villa with private pool exceeded every expectation. The butler knew what I wanted before I did.", rating: 5, img: "https://i.pravatar.cc/120?img=3", country: "🇨🇳 China" },
];

function useCountdown(days) {
  const [time, setTime] = useState({ h: 23 - (days % 24), m: 41, s: 58 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function Countdown({ days }) {
  const { h, m, s } = useCountdown(days);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "14px 0" }}>
      {[["Days", days], ["Hrs", pad(h)], ["Min", pad(m)], ["Sec", pad(s)]].map(([label, val]) => (
        <div key={label} style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 8, padding: "8px 12px", textAlign: "center", minWidth: 52 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#d4af37", fontVariantNumeric: "tabular-nums" }}>{val}</div>
          <div style={{ fontSize: 9, opacity: 0.6, letterSpacing: 2, marginTop: 2 }}>{label.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

function Stars({ n }) {
  return <span style={{ color: "#d4af37", fontSize: 16, letterSpacing: 2 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

const CATEGORIES = ["All", "Classic", "Deluxe", "Suite", "Villa", "Penthouse", "Bungalow", "Studio", "Loft", "Treehouse", "Other"];

const MEMBERSHIP_TIERS = [
  { tier: "Gold", icon: "🥇", price: "₹15,000/yr", color: "#d4af37", perks: ["10% off all stays", "Free breakfast daily", "Priority check-in", "Room upgrade on availability"] },
  { tier: "Platinum", icon: "💎", price: "₹35,000/yr", color: "#a8d8ea", perks: ["20% off all stays", "Suite upgrade guaranteed", "Complimentary spa session", "Dedicated concierge", "Airport limousine"] },
  { tier: "Diamond", icon: "👑", price: "₹75,000/yr", color: "#f0c040", perks: ["30% off all stays", "Presidential access", "Private arrival lounge", "Personal butler", "Helipad transfers", "Exclusive member events"] },
];

export default function App() {
  const [active, setActive] = useState("Home");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomCategory, setRoomCategory] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [galleryHover, setGalleryHover] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", checkin: "", checkout: "", room: "", guests: "2", requests: "" });
  const [formSent, setFormSent] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);

  // Registration state
  const [regData, setRegData] = useState({ firstName: "", lastName: "", email: "", phone: "", dob: "", nationality: "", idType: "Passport", idNumber: "", address: "", city: "", country: "", tier: "Gold", password: "", confirm: "", newsletter: true, terms: false });
  const [regStep, setRegStep] = useState(1);
  const [regDone, setRegDone] = useState(false);
  const [regErrors, setRegErrors] = useState({});

  const sectionRefs = useRef({});
  const autoTestimonial = useRef(null);
  const videoRef = useRef(null);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setVideoMuted(vid.muted);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    autoTestimonial.current = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(autoTestimonial.current);
  }, []);

  const scrollTo = useCallback((section) => {
    setActive(section);
    setMenuOpen(false);
    const el = sectionRefs.current[section];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const filteredRooms = roomCategory === "All" ? ROOMS : ROOMS.filter(r => r.category === roomCategory || (roomCategory === "Other" && !["Classic","Deluxe","Suite","Villa","Penthouse","Bungalow","Studio","Loft","Treehouse"].includes(r.category)));

  const openLightbox = (idx) => { setLightboxIdx(idx); setLightbox(true); };
  const lightboxPrev = () => setLightboxIdx(i => (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length);
  const lightboxNext = () => setLightboxIdx(i => (i + 1) % GALLERY_IMGS.length);

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFormSubmit = () => {
    if (formData.name && formData.email && formData.checkin) {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 5000);
    }
  };

  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegData(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!regData.firstName.trim()) errs.firstName = "Required";
      if (!regData.lastName.trim()) errs.lastName = "Required";
      if (!regData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
      if (!regData.phone.trim()) errs.phone = "Required";
      if (!regData.dob) errs.dob = "Required";
    }
    if (step === 2) {
      if (!regData.idNumber.trim()) errs.idNumber = "Required";
      if (!regData.address.trim()) errs.address = "Required";
      if (!regData.city.trim()) errs.city = "Required";
      if (!regData.country.trim()) errs.country = "Required";
    }
    if (step === 3) {
      if (!regData.password || regData.password.length < 8) errs.password = "Min 8 characters";
      if (regData.password !== regData.confirm) errs.confirm = "Passwords do not match";
      if (!regData.terms) errs.terms = "You must accept the terms";
    }
    return errs;
  };

  const handleRegNext = () => {
    const errs = validateStep(regStep);
    if (Object.keys(errs).length > 0) { setRegErrors(errs); return; }
    setRegErrors({});
    if (regStep < 3) setRegStep(s => s + 1);
    else setRegDone(true);
  };

  const policyColors = { info: { bg: "rgba(91,141,238,0.08)", border: "rgba(91,141,238,0.3)", icon: "#5b8dee" }, warning: { bg: "rgba(240,160,40,0.08)", border: "rgba(240,160,40,0.3)", icon: "#f0a028" }, danger: { bg: "rgba(232,93,93,0.08)", border: "rgba(232,93,93,0.3)", icon: "#e85d5d" }, success: { bg: "rgba(30,200,160,0.08)", border: "rgba(30,200,160,0.3)", icon: "#1ec8a0" }, gold: { bg: "rgba(212,175,55,0.08)", border: "rgba(212,175,55,0.3)", icon: "#d4af37" } };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{--gold:#d4af37;--gold-light:#f0d060;--dark:#080808;--dark2:#0e0e0e;--mid:#181818;--light:#f5f0e8;--text:#bbb;--card:#141414;}
    html{scroll-behavior:smooth;}
    body{background:var(--dark);color:var(--light);font-family:'DM Sans',sans-serif;overflow-x:hidden;}
    h1,h2,h3,h4{font-family:'Cormorant Garamond',serif;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
    @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.35);}50%{box-shadow:0 0 0 14px rgba(212,175,55,0);}}
    @keyframes rotateIn{from{opacity:0;transform:rotate(-5deg) scale(0.95);}to{opacity:1;transform:rotate(0) scale(1);}}
    @keyframes stepPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
    .fade-up{animation:fadeUp 0.9s ease both;}
    .fade-in{animation:fadeIn 1.2s ease both;}
    .gold{color:var(--gold);}
    .section-title{font-size:clamp(2rem,5vw,3.5rem);font-weight:300;letter-spacing:2px;margin-bottom:8px;}
    .section-sub{color:var(--gold);font-size:0.72rem;letter-spacing:6px;text-transform:uppercase;font-family:'DM Sans',sans-serif;margin-bottom:16px;}
    .divider{width:60px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);margin:0 auto 40px;}
    .btn-gold{background:linear-gradient(135deg,#d4af37,#f0c840);color:#000;border:none;padding:14px 36px;font-size:0.78rem;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'DM Sans';font-weight:500;transition:all 0.3s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);}
    .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,175,55,0.4);}
    .btn-outline{background:transparent;color:var(--gold);border:1px solid rgba(212,175,55,0.5);padding:11px 28px;font-size:0.75rem;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'DM Sans';transition:all 0.3s;}
    .btn-outline:hover{background:var(--gold);color:#000;}
    section{padding:100px 24px;text-align:center;}
    .card{background:var(--card);border:1px solid rgba(212,175,55,0.12);transition:transform 0.35s,border-color 0.35s,box-shadow 0.35s;overflow:hidden;}
    .card:hover{transform:translateY(-6px);border-color:rgba(212,175,55,0.4);box-shadow:0 20px 60px rgba(0,0,0,0.5);}
    input,textarea,select{background:rgba(255,255,255,0.04);border:1px solid rgba(212,175,55,0.2);color:#fff;padding:14px 18px;font-family:'DM Sans';font-size:0.9rem;width:100%;outline:none;transition:border-color 0.3s,background 0.3s;border-radius:4px;}
    input:focus,textarea:focus,select:focus{border-color:var(--gold);background:rgba(212,175,55,0.04);}
    input::placeholder,textarea::placeholder{color:#555;}
    select option{background:#111;color:#fff;}
    input[type="checkbox"]{width:auto;margin-right:8px;}
    .gallery-item{position:relative;overflow:hidden;cursor:pointer;border-radius:4px;}
    .gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s;}
    .gallery-item:hover img{transform:scale(1.1);filter:brightness(0.75);}
    .gallery-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 0.4s;background:linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.6));}
    .gallery-item:hover .gallery-overlay{opacity:1;}
    .err{color:#e85d5d;font-size:0.72rem;margin-top:4px;}
    @media(max-width:768px){section{padding:70px 16px;}}
    @media(max-width:768px){.desktop-nav{display:none!important;}.hamburger{display:block!important;}[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}
  `;

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(8,8,8,0.96)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(212,175,55,0.1)":"none",transition:"all 0.4s",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",height:70 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,letterSpacing:7,color:"#d4af37",cursor:"pointer" }} onClick={()=>scrollTo("Home")}>
          AURUM<span style={{ color:"#fff",fontSize:11,letterSpacing:3,marginLeft:6,verticalAlign:"middle",opacity:0.8 }}>RESORT</span>
        </div>
        <div style={{ display:"flex",gap:28,alignItems:"center" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={()=>scrollTo(link)} style={{ background:"none",border:"none",color:active===link?"#d4af37":"#888",cursor:"pointer",fontSize:"0.72rem",letterSpacing:2.5,textTransform:"uppercase",fontFamily:"'DM Sans'",fontWeight:400,transition:"color 0.3s",borderBottom:active===link?"1px solid #d4af37":"1px solid transparent",paddingBottom:2 }}>{link}</button>
          ))}
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{ display:"none",background:"none",border:"none",color:"#d4af37",fontSize:24,cursor:"pointer" }} className="hamburger">☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed",top:70,left:0,right:0,background:"rgba(8,8,8,0.99)",zIndex:999,padding:"28px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:24,borderBottom:"1px solid rgba(212,175,55,0.1)" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={()=>scrollTo(link)} style={{ background:"none",border:"none",color:active===link?"#d4af37":"#888",cursor:"pointer",fontSize:"0.9rem",letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Sans'" }}>{link}</button>
          ))}
        </div>
      )}

      {/* HOME — uses uploaded hotel_vedio.mp4 */}
      <section ref={el=>sectionRefs.current["Home"]=el} style={{ padding:0,position:"relative",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0 }}
          src="hotel_vedio.mp4"
          poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
        />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.55) 50%,rgba(8,8,8,0.95) 100%)",zIndex:1 }} />
        <button onClick={toggleMute} title={videoMuted ? "Unmute video" : "Mute video"} style={{ position:"absolute",bottom:36,right:36,zIndex:10,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(12px)",border:"1px solid rgba(212,175,55,0.45)",borderRadius:"50%",width:52,height:52,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s",boxShadow:"0 4px 24px rgba(0,0,0,0.4)" }}
          onMouseOver={e=>{ e.currentTarget.style.background="rgba(212,175,55,0.2)"; e.currentTarget.style.borderColor="rgba(212,175,55,0.9)"; e.currentTarget.style.transform="scale(1.1)"; }}
          onMouseOut={e=>{ e.currentTarget.style.background="rgba(0,0,0,0.55)"; e.currentTarget.style.borderColor="rgba(212,175,55,0.45)"; e.currentTarget.style.transform="scale(1)"; }}>
          <span style={{ fontSize:22, lineHeight:1 }}>{videoMuted ? "🔇" : "🔊"}</span>
        </button>
        <div style={{ position:"absolute",bottom:96,right:36,zIndex:10,color:"rgba(212,175,55,0.75)",fontSize:"0.62rem",letterSpacing:3,textAlign:"center",pointerEvents:"none" }}>
          {videoMuted ? "UNMUTE" : "MUTE"}
        </div>
        <div style={{ position:"relative",zIndex:2,textAlign:"center",padding:"0 24px",maxWidth:900 }}>
          <p className="fade-up section-sub" style={{ animationDelay:"0.2s" }}>Est. 2008 · Bengaluru, India</p>
          <h1 className="fade-up" style={{ fontSize:"clamp(3.5rem,10vw,7.5rem)",fontWeight:300,letterSpacing:"0.08em",lineHeight:1,animationDelay:"0.4s" }}>
            AURUM<br /><em style={{ color:"#d4af37",fontStyle:"italic",fontSize:"0.65em" }}>Resort & Spa</em>
          </h1>
          <div className="fade-up" style={{ width:100,height:1,background:"linear-gradient(to right,transparent,#d4af37,transparent)",margin:"28px auto",animationDelay:"0.6s" }} />
          <p className="fade-up" style={{ margin:"0 auto 40px",maxWidth:500,fontSize:"1.05rem",fontWeight:300,opacity:0.8,lineHeight:1.9,animationDelay:"0.7s" }}>
            Where timeless luxury meets the art of living. 32 extraordinary suites. One unforgettable world.
          </p>
          <div className="fade-up" style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animationDelay:"1s" }}>
            <button className="btn-gold" onClick={()=>scrollTo("Rooms")}>Explore 32 Suites</button>
            <button className="btn-outline" onClick={()=>scrollTo("Register")}>Become a Member</button>
            <button className="btn-outline" onClick={()=>scrollTo("Contact")}>Reserve Now</button>
          </div>
          <div className="fade-up" style={{ display:"flex",gap:40,justifyContent:"center",marginTop:60,animationDelay:"1.2s" }}>
            {[["32+","Unique Rooms"],["5","Restaurants"],["12","World Awards"],["24/7","Butler Service"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond'",fontSize:"2rem",color:"#d4af37",fontWeight:300 }}>{n}</div>
                <div style={{ fontSize:"0.65rem",letterSpacing:3,opacity:0.55,marginTop:4 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:2,textAlign:"center",cursor:"pointer" }} onClick={()=>scrollTo("Rooms")}>
          <div style={{ width:1,height:50,background:"linear-gradient(to bottom,transparent,#d4af37)",margin:"0 auto 8px" }} />
          <span style={{ fontSize:"0.62rem",letterSpacing:5,color:"#d4af37" }}>SCROLL</span>
        </div>
      </section>

      {/* ROOMS */}
      <section ref={el=>sectionRefs.current["Rooms"]=el} style={{ background:"var(--dark2)" }}>
        <p className="section-sub">Accommodation</p>
        <h2 className="section-title">32 Rooms & Suites</h2>
        <div className="divider" />
        <div style={{ display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:48,maxWidth:900,margin:"0 auto 48px" }}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setRoomCategory(cat)} style={{ background:roomCategory===cat?"linear-gradient(135deg,#d4af37,#f0c840)":"rgba(255,255,255,0.04)",color:roomCategory===cat?"#000":"#888",border:`1px solid ${roomCategory===cat?"transparent":"rgba(212,175,55,0.2)"}`,padding:"8px 18px",fontSize:"0.72rem",letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"'DM Sans'",transition:"all 0.25s" }}>{cat}</button>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24,maxWidth:1200,margin:"0 auto" }}>
          {filteredRooms.map((room,i)=>(
            <div key={room.id} className="card fade-in" style={{ animationDelay:`${i*0.06}s` }}>
              <div style={{ position:"relative",overflow:"hidden",height:220 }}>
                <img src={room.img} alt={room.name} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s" }}
                  onMouseOver={e=>e.target.style.transform="scale(1.08)"}
                  onMouseOut={e=>e.target.style.transform="scale(1)"} />
                <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.7))" }} />
                <div style={{ position:"absolute",top:14,left:14,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",color:"#d4af37",padding:"4px 12px",fontSize:"0.68rem",letterSpacing:2,border:"1px solid rgba(212,175,55,0.3)",borderRadius:2 }}>{room.category.toUpperCase()}</div>
                <div style={{ position:"absolute",top:14,right:14,background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",padding:"5px 12px",fontSize:"0.78rem",fontWeight:600,borderRadius:2 }}>FROM ${room.price}</div>
                <div style={{ position:"absolute",bottom:12,left:16 }}>
                  <span style={{ fontSize:"0.68rem",color:"#ccc",opacity:0.9 }}>👥 {room.capacity}  ·  📐 {room.size}  ·  🏢 {room.floor}</span>
                </div>
              </div>
              <div style={{ padding:"22px 24px 24px",textAlign:"left" }}>
                <h3 style={{ fontSize:"1.25rem",fontWeight:400,marginBottom:10,color:"#f0ede0" }}>{room.name}</h3>
                <p style={{ fontSize:"0.8rem",color:"#888",lineHeight:1.7,marginBottom:16 }}>{room.desc}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:18 }}>
                  {room.amenities.map((a,j)=>(
                    <span key={j} style={{ background:"rgba(212,175,55,0.07)",border:"1px solid rgba(212,175,55,0.18)",padding:"3px 9px",fontSize:"0.7rem",color:"#aaa",borderRadius:2 }}>{a}</span>
                  ))}
                </div>
                <div style={{ display:"flex",gap:10 }}>
                  <button className="btn-outline" style={{ flex:1,textAlign:"center",padding:"9px 14px",fontSize:"0.7rem" }} onClick={()=>setSelectedRoom(room)}>View Details</button>
                  <button className="btn-gold" style={{ flex:1,textAlign:"center",padding:"9px 14px",fontSize:"0.7rem" }} onClick={()=>{ setFormData(p=>({...p,room:room.name})); scrollTo("Contact"); }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROOM MODAL */}
      {selectedRoom && (
        <div onClick={()=>setSelectedRoom(null)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.93)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#111",border:"1px solid rgba(212,175,55,0.25)",borderRadius:8,maxWidth:700,width:"100%",maxHeight:"90vh",overflow:"auto" }}>
            <div style={{ position:"relative",height:300 }}>
              <img src={selectedRoom.img} alt={selectedRoom.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,#111)" }} />
              <button onClick={()=>setSelectedRoom(null)} style={{ position:"absolute",top:16,right:16,background:"rgba(0,0,0,0.7)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16 }}>✕</button>
              <div style={{ position:"absolute",bottom:20,left:24 }}>
                <span style={{ background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",padding:"5px 14px",fontSize:"0.72rem",fontWeight:600,borderRadius:2,marginRight:8 }}>{selectedRoom.category}</span>
                <span style={{ color:"#d4af37",fontSize:"0.72rem",letterSpacing:2 }}>{selectedRoom.floor} Floor</span>
              </div>
            </div>
            <div style={{ padding:32 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:12 }}>
                <h2 style={{ fontSize:"1.8rem",fontWeight:300 }}>{selectedRoom.name}</h2>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond'",fontSize:"2rem",color:"#d4af37" }}>${selectedRoom.price}</div>
                  <div style={{ fontSize:"0.72rem",color:"#666",letterSpacing:2 }}>PER NIGHT</div>
                </div>
              </div>
              <p style={{ color:"#999",lineHeight:1.8,marginBottom:24,fontSize:"0.9rem" }}>{selectedRoom.desc}</p>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24 }}>
                {[["Size",selectedRoom.size],["Capacity",`${selectedRoom.capacity} Guests`],["Floor",selectedRoom.floor]].map(([k,v])=>(
                  <div key={k} style={{ background:"rgba(212,175,55,0.06)",border:"1px solid rgba(212,175,55,0.15)",padding:"14px",borderRadius:4,textAlign:"center" }}>
                    <div style={{ fontSize:"0.7rem",color:"#666",letterSpacing:2,marginBottom:6 }}>{k.toUpperCase()}</div>
                    <div style={{ fontSize:"0.95rem",color:"#d4af37",fontFamily:"'Cormorant Garamond'",fontWeight:400 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:28 }}>
                {selectedRoom.amenities.map((a,j)=>(
                  <span key={j} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",padding:"6px 14px",fontSize:"0.78rem",color:"#ccc",borderRadius:3 }}>{a}</span>
                ))}
              </div>
              <button className="btn-gold" style={{ width:"100%",fontSize:"0.8rem" }} onClick={()=>{ setFormData(p=>({...p,room:selectedRoom.name})); setSelectedRoom(null); scrollTo("Contact"); }}>Reserve This Room</button>
            </div>
          </div>
        </div>
      )}

      {/* AMENITIES */}
      <section ref={el=>sectionRefs.current["Amenities"]=el} style={{ background:"var(--dark)" }}>
        <p className="section-sub">Facilities</p>
        <h2 className="section-title">World-Class Amenities</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20,maxWidth:1200,margin:"0 auto" }}>
          {AMENITIES.map((a,i)=>(
            <div key={i} className="card" style={{ padding:"36px 28px",textAlign:"center",cursor:"default",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,left:0,width:3,height:"100%",background:"linear-gradient(to bottom,transparent,rgba(212,175,55,0.4),transparent)" }} />
              <div style={{ fontSize:48,marginBottom:16,filter:"drop-shadow(0 4px 12px rgba(212,175,55,0.3))" }}>{a.icon}</div>
              <h3 style={{ fontSize:"1.1rem",fontWeight:400,color:"#d4af37",marginBottom:10,letterSpacing:1 }}>{a.name}</h3>
              <p style={{ fontSize:"0.82rem",lineHeight:1.8,color:"#777" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section ref={el=>sectionRefs.current["Gallery"]=el} style={{ background:"var(--dark2)",padding:"100px 0" }}>
        <p className="section-sub">Visual Stories</p>
        <h2 className="section-title">Gallery</h2>
        <div className="divider" />
        <p style={{ color:"#666",fontSize:"0.8rem",letterSpacing:2,marginBottom:48 }}>CLICK ANY IMAGE TO EXPLORE</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"auto",gap:4,maxWidth:1400,margin:"0 auto",padding:"0 4px" }}>
          {GALLERY_IMGS.map((src,i)=>{
            const configs = [
              {col:"1/3",row:"1/3"},{col:"3/4",row:"1/2"},{col:"4/5",row:"1/2"},
              {col:"3/4",row:"2/3"},{col:"4/5",row:"2/3"},{col:"1/2",row:"3/4"},
              {col:"2/4",row:"3/5"},{col:"4/5",row:"3/5"},{col:"1/2",row:"4/5"},
              {col:"4/5",row:"4/5"},{col:"1/2",row:"5/6"},{col:"2/3",row:"5/6"},
              {col:"3/5",row:"5/6"},{col:"4/5",row:"5/6"},{col:"1/3",row:"6/7"},
              {col:"3/5",row:"6/7"},{col:"4/5",row:"6/7"},
            ];
            const cfg = configs[i] || {col:"auto",row:"auto"};
            return (
              <div key={i} className="gallery-item" style={{ gridColumn:cfg.col,gridRow:cfg.row,height:240 }}
                onMouseEnter={()=>setGalleryHover(i)} onMouseLeave={()=>setGalleryHover(null)}
                onClick={()=>openLightbox(i)}>
                <img src={src} alt={`Gallery ${i+1}`} />
                <div className="gallery-overlay">
                  <div style={{ background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.5)",borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:12,transform:galleryHover===i?"scale(1)":"scale(0.7)",transition:"transform 0.4s" }}>⊕</div>
                  <p style={{ fontSize:"0.7rem",letterSpacing:3,color:"rgba(212,175,55,0.9)" }}>VIEW FULL SIZE</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.97)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <button onClick={lightboxPrev} style={{ position:"absolute",left:24,background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.4)",color:"#d4af37",borderRadius:"50%",width:48,height:48,cursor:"pointer",fontSize:20,zIndex:2 }}>‹</button>
          <img src={GALLERY_IMGS[lightboxIdx]} alt="" style={{ maxWidth:"85vw",maxHeight:"85vh",objectFit:"contain",borderRadius:4,animation:"rotateIn 0.4s ease" }} />
          <button onClick={lightboxNext} style={{ position:"absolute",right:24,background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.4)",color:"#d4af37",borderRadius:"50%",width:48,height:48,cursor:"pointer",fontSize:20,zIndex:2 }}>›</button>
          <button onClick={()=>setLightbox(null)} style={{ position:"absolute",top:24,right:24,background:"none",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",borderRadius:"50%",width:40,height:40,cursor:"pointer",fontSize:16 }}>✕</button>
          <div style={{ position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6 }}>
            {GALLERY_IMGS.map((_,i)=>(
              <button key={i} onClick={()=>setLightboxIdx(i)} style={{ width:i===lightboxIdx?24:6,height:6,borderRadius:3,border:"none",background:i===lightboxIdx?"#d4af37":"rgba(212,175,55,0.3)",cursor:"pointer",transition:"all 0.3s" }} />
            ))}
          </div>
          <div style={{ position:"absolute",bottom:28,right:32,color:"#555",fontSize:"0.75rem",letterSpacing:2 }}>{lightboxIdx+1} / {GALLERY_IMGS.length}</div>
        </div>
      )}

      {/* OFFERS */}
      <section ref={el=>sectionRefs.current["Offers"]=el} style={{ background:"var(--dark)" }}>
        <p className="section-sub">Exclusive</p>
        <h2 className="section-title">Offers & Packages</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:28,maxWidth:1200,margin:"0 auto" }}>
          {OFFERS.map((o,i)=>(
            <div key={i} style={{ position:"relative",borderRadius:6,overflow:"hidden",border:"1px solid rgba(212,175,55,0.15)",background:o.gradient,transition:"transform 0.35s,border-color 0.35s,box-shadow 0.35s" }}
              onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor="rgba(212,175,55,0.4)"; e.currentTarget.style.boxShadow="0 24px 60px rgba(0,0,0,0.5)"; }}
              onMouseOut={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(212,175,55,0.15)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(to right,${o.color},#d4af37)` }} />
              <div style={{ padding:"28px 28px 24px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
                  <div style={{ fontSize:40 }}>{o.emoji}</div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ background:`${o.color}22`,border:`1px solid ${o.color}55`,color:o.color,padding:"3px 10px",fontSize:"0.65rem",letterSpacing:2,borderRadius:2,marginBottom:6 }}>{o.tag.toUpperCase()}</div>
                    <div style={{ background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",padding:"5px 14px",fontWeight:700,fontSize:"0.82rem",letterSpacing:2,borderRadius:2 }}>{o.discount}</div>
                  </div>
                </div>
                <h3 style={{ fontSize:"1.5rem",fontWeight:300,marginBottom:10,color:"#f0ede0",letterSpacing:1 }}>{o.title}</h3>
                <p style={{ fontSize:"0.82rem",color:"#888",lineHeight:1.8,marginBottom:18 }}>{o.desc}</p>
                <div style={{ display:"flex",alignItems:"baseline",gap:10,marginBottom:4 }}>
                  <span style={{ textDecoration:"line-through",color:"#555",fontSize:"0.9rem" }}>${o.original}</span>
                  <span style={{ fontFamily:"'Cormorant Garamond'",fontSize:"2.2rem",color:"#d4af37",lineHeight:1 }}>${o.sale}</span>
                  <span style={{ color:"#555",fontSize:"0.78rem" }}>/night</span>
                </div>
                <Countdown days={o.ends} />
                <button className="btn-gold" style={{ width:"100%",marginTop:10,fontSize:"0.75rem" }} onClick={()=>scrollTo("Contact")}>Claim Offer</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1200,margin:"60px auto 0",background:"linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))",border:"1px solid rgba(212,175,55,0.25)",borderRadius:6,padding:"28px 36px",display:"flex",alignItems:"center",gap:24,flexWrap:"wrap",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ fontSize:32,animation:"float 3s ease-in-out infinite" }}>📣</div>
            <div>
              <div style={{ fontSize:"0.65rem",letterSpacing:4,color:"#d4af37",marginBottom:4 }}>LATEST ANNOUNCEMENT</div>
              <p style={{ color:"#ccc",fontSize:"0.9rem",lineHeight:1.6,maxWidth:560 }}>New <strong style={{color:"#d4af37"}}>Celestial Dome Suite</strong> now open for reservations. Limited availability for Summer 2026.</p>
            </div>
          </div>
          <button className="btn-outline" style={{ whiteSpace:"nowrap",fontSize:"0.7rem" }} onClick={()=>scrollTo("Rooms")}>Explore Now</button>
        </div>
      </section>

      {/* POLICIES */}
      <section ref={el=>sectionRefs.current["Policies"]=el} style={{ background:"var(--dark2)" }}>
        <p className="section-sub">Guidelines</p>
        <h2 className="section-title">Policies & Penalties</h2>
        <div className="divider" />
        <p style={{ color:"#666",maxWidth:600,margin:"0 auto 52px",lineHeight:1.8,fontSize:"0.88rem" }}>At Aurum, we maintain the highest standards for all guests. Please review our policies to ensure a seamless and respectful stay.</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20,maxWidth:1200,margin:"0 auto" }}>
          {POLICIES.map((p,i)=>{
            const c = policyColors[p.type];
            return (
              <div key={i} style={{ background:c.bg,border:`1px solid ${c.border}`,borderRadius:6,padding:"26px 28px",textAlign:"left",transition:"transform 0.3s,box-shadow 0.3s" }}
                onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.4)"; }}
                onMouseOut={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:18 }}>
                  <div style={{ fontSize:28 }}>{p.icon}</div>
                  <h3 style={{ fontSize:"1.05rem",fontWeight:400,color:c.icon,letterSpacing:0.5 }}>{p.title}</h3>
                </div>
                <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:10 }}>
                  {p.rules.map((rule,j)=>(
                    <li key={j} style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
                      <span style={{ color:c.icon,fontSize:14,marginTop:2,flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:"0.82rem",color:"#999",lineHeight:1.6 }}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={el=>sectionRefs.current["Testimonials"]=el} style={{ background:"var(--dark)" }}>
        <p className="section-sub">Guest Stories</p>
        <h2 className="section-title">What They Say</h2>
        <div className="divider" />
        <div style={{ maxWidth:760,margin:"0 auto",position:"relative" }}>
          <div style={{ background:"var(--card)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:8,padding:"52px 48px",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,transparent,#d4af37,transparent)" }} />
            <div style={{ fontSize:80,color:"rgba(212,175,55,0.1)",fontFamily:"'Cormorant Garamond'",lineHeight:1,position:"absolute",top:20,left:32 }}>"</div>
            <div style={{ position:"relative",zIndex:1 }}>
              <img src={TESTIMONIALS[testimonialIdx].img} alt="" style={{ width:76,height:76,borderRadius:"50%",border:"2px solid #d4af37",marginBottom:20,objectFit:"cover" }} />
              <Stars n={TESTIMONIALS[testimonialIdx].rating} />
              <p style={{ fontSize:"1.15rem",fontFamily:"'Cormorant Garamond'",fontStyle:"italic",lineHeight:1.9,margin:"20px 0 28px",color:"#ddd" }}>"{TESTIMONIALS[testimonialIdx].text}"</p>
              <h4 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.15rem",fontWeight:600,color:"#d4af37" }}>{TESTIMONIALS[testimonialIdx].name}</h4>
              <p style={{ fontSize:"0.75rem",color:"#666",letterSpacing:2,marginTop:4 }}>{TESTIMONIALS[testimonialIdx].role}</p>
              <p style={{ fontSize:"0.72rem",color:"#555",marginTop:6 }}>{TESTIMONIALS[testimonialIdx].country}</p>
            </div>
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:10,marginTop:28 }}>
            {TESTIMONIALS.map((_,i)=>(
              <button key={i} onClick={()=>setTestimonialIdx(i)} style={{ width:i===testimonialIdx?28:7,height:7,borderRadius:4,border:"none",cursor:"pointer",background:i===testimonialIdx?"#d4af37":"rgba(212,175,55,0.25)",transition:"all 0.35s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REGISTRATION SECTION — NEW
      ══════════════════════════════════════════ */}
      <section ref={el=>sectionRefs.current["Register"]=el} style={{ background:"var(--dark2)" }}>
        <p className="section-sub">Membership</p>
        <h2 className="section-title">Create Your Account</h2>
        <div className="divider" />
        <p style={{ color:"#666",maxWidth:580,margin:"0 auto 52px",lineHeight:1.8,fontSize:"0.88rem" }}>
          Join the Aurum family and unlock exclusive member rates, early access to new suites, and a world-class loyalty programme.
        </p>

        {/* Membership Tier Cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20,maxWidth:900,margin:"0 auto 60px" }}>
          {MEMBERSHIP_TIERS.map(t=>(
            <div key={t.tier} onClick={()=>setRegData(p=>({...p,tier:t.tier}))} style={{ border:`2px solid ${regData.tier===t.tier?t.color:"rgba(212,175,55,0.12)"}`,borderRadius:8,padding:"28px 24px",cursor:"pointer",background:regData.tier===t.tier?`${t.color}12`:"var(--card)",transition:"all 0.3s",transform:regData.tier===t.tier?"translateY(-4px)":"none",boxShadow:regData.tier===t.tier?`0 16px 48px rgba(0,0,0,0.5)`:"none",textAlign:"left" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontSize:32 }}>{t.icon}</span>
                {regData.tier===t.tier && <span style={{ background:`${t.color}22`,border:`1px solid ${t.color}`,color:t.color,fontSize:"0.65rem",letterSpacing:2,padding:"3px 10px",borderRadius:2 }}>SELECTED</span>}
              </div>
              <h3 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.5rem",fontWeight:400,color:t.color,marginBottom:4 }}>{t.tier}</h3>
              <p style={{ fontSize:"0.78rem",color:"#666",marginBottom:16 }}>{t.price}</p>
              <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:8 }}>
                {t.perks.map((perk,j)=>(
                  <li key={j} style={{ display:"flex",gap:8,alignItems:"flex-start" }}>
                    <span style={{ color:t.color,fontSize:12,marginTop:3 }}>✦</span>
                    <span style={{ fontSize:"0.78rem",color:"#888" }}>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Step Indicator */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:0,marginBottom:44,maxWidth:480,margin:"0 auto 44px" }}>
          {[1,2,3].map((s,i)=>(
            <div key={s} style={{ display:"flex",alignItems:"center",flex:1 }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flex:"0 0 auto" }}>
                <div style={{ width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:regStep>=s?"linear-gradient(135deg,#d4af37,#f0c840)":"rgba(255,255,255,0.05)",border:`2px solid ${regStep>=s?"#d4af37":"rgba(212,175,55,0.2)"}`,color:regStep>=s?"#000":"#555",fontWeight:600,fontSize:"0.9rem",animation:regStep===s?"stepPulse 2s infinite":"none",transition:"all 0.4s" }}>
                  {regStep>s ? "✓" : s}
                </div>
                <span style={{ fontSize:"0.65rem",letterSpacing:2,color:regStep>=s?"#d4af37":"#444",marginTop:8,whiteSpace:"nowrap" }}>
                  {["PERSONAL","ADDRESS","SECURITY"][i]}
                </span>
              </div>
              {i<2 && <div style={{ flex:1,height:2,background:`linear-gradient(to right,${regStep>s?"#d4af37":"rgba(212,175,55,0.15)"},${regStep>s+1?"#d4af37":"rgba(212,175,55,0.15)"})`,margin:"0 8px",marginBottom:28,transition:"background 0.4s" }} />}
            </div>
          ))}
        </div>

        {/* Registration Form Card */}
        <div style={{ maxWidth:680,margin:"0 auto",background:"var(--card)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:8,padding:"40px 44px",position:"relative",overflow:"hidden",textAlign:"left" }}>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,#d4af37,#f0c840,transparent)" }} />

          {regDone ? (
            <div style={{ textAlign:"center",padding:"40px 0" }}>
              <div style={{ fontSize:64,animation:"float 2s ease-in-out infinite",marginBottom:20 }}>🎉</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"2rem",color:"#d4af37",marginBottom:14 }}>Welcome to Aurum!</h3>
              <p style={{ color:"#888",lineHeight:1.8,marginBottom:8 }}>
                Your <strong style={{color:"#d4af37"}}>{regData.tier} Membership</strong> account has been created for <strong style={{color:"#ccc"}}>{regData.firstName} {regData.lastName}</strong>.
              </p>
              <p style={{ color:"#666",fontSize:"0.85rem",marginBottom:32 }}>A welcome email with your membership details has been sent to {regData.email}.</p>
              <button className="btn-gold" onClick={()=>{ setRegDone(false); setRegStep(1); scrollTo("Contact"); }}>Make Your First Reservation →</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.5rem",fontWeight:300,color:"#d4af37",marginBottom:24 }}>
                {["Personal Details","Address & Identity","Security & Preferences"][regStep-1]}
              </h3>

              {regStep === 1 && (
                <div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>FIRST NAME *</label>
                      <input name="firstName" value={regData.firstName} onChange={handleRegChange} placeholder="First name" />
                      {regErrors.firstName && <div className="err">{regErrors.firstName}</div>}
                    </div>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>LAST NAME *</label>
                      <input name="lastName" value={regData.lastName} onChange={handleRegChange} placeholder="Last name" />
                      {regErrors.lastName && <div className="err">{regErrors.lastName}</div>}
                    </div>
                  </div>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>EMAIL ADDRESS *</label>
                    <input name="email" type="email" value={regData.email} onChange={handleRegChange} placeholder="you@email.com" />
                    {regErrors.email && <div className="err">{regErrors.email}</div>}
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>PHONE *</label>
                      <input name="phone" value={regData.phone} onChange={handleRegChange} placeholder="+91 ..." />
                      {regErrors.phone && <div className="err">{regErrors.phone}</div>}
                    </div>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>DATE OF BIRTH *</label>
                      <input name="dob" type="date" value={regData.dob} onChange={handleRegChange} />
                      {regErrors.dob && <div className="err">{regErrors.dob}</div>}
                    </div>
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>NATIONALITY</label>
                    <input name="nationality" value={regData.nationality} onChange={handleRegChange} placeholder="e.g. Indian" />
                  </div>
                  <div style={{ marginBottom:16,padding:"14px 18px",background:"rgba(212,175,55,0.05)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:4 }}>
                    <div style={{ fontSize:"0.65rem",letterSpacing:3,color:"#d4af37",marginBottom:12 }}>SELECTED MEMBERSHIP TIER</div>
                    <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                      {MEMBERSHIP_TIERS.map(t=>(
                        <label key={t.tier} style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"6px 14px",border:`1px solid ${regData.tier===t.tier?t.color:"rgba(212,175,55,0.2)"}`,borderRadius:3,background:regData.tier===t.tier?`${t.color}15`:"transparent",transition:"all 0.2s" }}>
                          <input type="radio" name="tier" value={t.tier} checked={regData.tier===t.tier} onChange={handleRegChange} style={{ width:"auto",accentColor:"#d4af37" }} />
                          <span style={{ fontSize:"0.78rem",color:regData.tier===t.tier?t.color:"#888" }}>{t.icon} {t.tier}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {regStep === 2 && (
                <div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>ID TYPE</label>
                      <select name="idType" value={regData.idType} onChange={handleRegChange}>
                        <option>Passport</option>
                        <option>National ID</option>
                        <option>Driving Licence</option>
                        <option>Aadhaar Card</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>ID NUMBER *</label>
                      <input name="idNumber" value={regData.idNumber} onChange={handleRegChange} placeholder="Document number" />
                      {regErrors.idNumber && <div className="err">{regErrors.idNumber}</div>}
                    </div>
                  </div>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>STREET ADDRESS *</label>
                    <input name="address" value={regData.address} onChange={handleRegChange} placeholder="123 Park Avenue..." />
                    {regErrors.address && <div className="err">{regErrors.address}</div>}
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24 }}>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>CITY *</label>
                      <input name="city" value={regData.city} onChange={handleRegChange} placeholder="City" />
                      {regErrors.city && <div className="err">{regErrors.city}</div>}
                    </div>
                    <div>
                      <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>COUNTRY *</label>
                      <input name="country" value={regData.country} onChange={handleRegChange} placeholder="Country" />
                      {regErrors.country && <div className="err">{regErrors.country}</div>}
                    </div>
                  </div>
                </div>
              )}

              {regStep === 3 && (
                <div>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>PASSWORD *</label>
                    <input name="password" type="password" value={regData.password} onChange={handleRegChange} placeholder="Min 8 characters" />
                    {regErrors.password && <div className="err">{regErrors.password}</div>}
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>CONFIRM PASSWORD *</label>
                    <input name="confirm" type="password" value={regData.confirm} onChange={handleRegChange} placeholder="Re-enter password" />
                    {regErrors.confirm && <div className="err">{regErrors.confirm}</div>}
                  </div>
                  <div style={{ marginBottom:14,display:"flex",alignItems:"flex-start",gap:10 }}>
                    <input type="checkbox" name="newsletter" checked={regData.newsletter} onChange={handleRegChange} style={{ marginTop:3 }} />
                    <label style={{ fontSize:"0.82rem",color:"#888",lineHeight:1.6,cursor:"pointer" }}>Subscribe to exclusive offers, early access rooms, and Aurum news</label>
                  </div>
                  <div style={{ marginBottom:24,display:"flex",alignItems:"flex-start",gap:10 }}>
                    <input type="checkbox" name="terms" checked={regData.terms} onChange={handleRegChange} style={{ marginTop:3 }} />
                    <label style={{ fontSize:"0.82rem",color:"#888",lineHeight:1.6,cursor:"pointer" }}>I accept the <span style={{color:"#d4af37",cursor:"pointer"}}>Terms & Conditions</span> and <span style={{color:"#d4af37",cursor:"pointer"}}>Privacy Policy</span> *</label>
                  </div>
                  {regErrors.terms && <div className="err" style={{marginBottom:12}}>{regErrors.terms}</div>}

                  {/* Summary */}
                  <div style={{ padding:"16px 20px",background:"rgba(212,175,55,0.05)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:6,marginBottom:24 }}>
                    <div style={{ fontSize:"0.65rem",letterSpacing:3,color:"#d4af37",marginBottom:12 }}>REGISTRATION SUMMARY</div>
                    {[["Name",`${regData.firstName} ${regData.lastName}`],["Email",regData.email],["Tier",`${regData.tier} Membership`],["Country",regData.country||"—"]].map(([k,v])=>(
                      <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                        <span style={{ fontSize:"0.78rem",color:"#555",letterSpacing:1 }}>{k}</span>
                        <span style={{ fontSize:"0.78rem",color:"#ccc" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display:"flex",gap:14,marginTop:8 }}>
                {regStep > 1 && (
                  <button className="btn-outline" style={{ flex:1,fontSize:"0.75rem",padding:"14px" }} onClick={()=>{ setRegStep(s=>s-1); setRegErrors({}); }}>← Back</button>
                )}
                <button className="btn-gold" style={{ flex:2,fontSize:"0.8rem",letterSpacing:3,padding:"16px" }} onClick={handleRegNext}>
                  {regStep < 3 ? "Continue →" : "Create My Account"}
                </button>
              </div>
              <p style={{ fontSize:"0.7rem",color:"#444",textAlign:"center",marginTop:16 }}>🔒 Your information is encrypted and securely stored. Already a member? <span style={{color:"#d4af37",cursor:"pointer"}} onClick={()=>scrollTo("Contact")}>Sign in</span></p>
            </>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section ref={el=>sectionRefs.current["Contact"]=el} style={{ background:"var(--dark)" }}>
        <p className="section-sub">Get In Touch</p>
        <h2 className="section-title">Reserve Your Stay</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:56,maxWidth:1100,margin:"0 auto",textAlign:"left" }}>
          <div style={{ background:"var(--card)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:8,padding:40,position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,#d4af37,transparent)" }} />
            <h3 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.7rem",fontWeight:300,marginBottom:8,color:"#d4af37" }}>Make a Reservation</h3>
            <p style={{ fontSize:"0.8rem",color:"#666",letterSpacing:1,marginBottom:28 }}>Complete the form and our team will confirm within 2 hours.</p>
            {formSent ? (
              <div style={{ textAlign:"center",padding:"48px 24px" }}>
                <div style={{ fontSize:56,marginBottom:16,animation:"float 2s ease-in-out infinite" }}>✨</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.6rem",color:"#d4af37",marginBottom:12 }}>Request Received</h3>
                <p style={{ color:"#888",fontSize:"0.88rem",lineHeight:1.7 }}>Our concierge team will reach out to confirm your reservation within 2 hours.</p>
              </div>
            ) : (
              <>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }}>
                  <div>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>FULL NAME *</label>
                    <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Your name" />
                  </div>
                  <div>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>EMAIL *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleFormChange} placeholder="you@email.com" />
                  </div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>PHONE</label>
                  <input name="phone" value={formData.phone} onChange={handleFormChange} placeholder="+91 ..." />
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }}>
                  <div>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>CHECK-IN *</label>
                    <input name="checkin" type="date" value={formData.checkin} onChange={handleFormChange} />
                  </div>
                  <div>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>CHECK-OUT</label>
                    <input name="checkout" type="date" value={formData.checkout} onChange={handleFormChange} />
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:14,marginBottom:14 }}>
                  <div>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>ROOM TYPE</label>
                    <select name="room" value={formData.room} onChange={handleFormChange}>
                      <option value="">Select a Room</option>
                      {ROOMS.map(r=><option key={r.id}>{r.name} — ${r.price}/night</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>GUESTS</label>
                    <select name="guests" value={formData.guests} onChange={handleFormChange}>
                      {[1,2,3,4,5,6].map(n=><option key={n}>{n} {n===1?"Guest":"Guests"}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom:24 }}>
                  <label style={{ fontSize:"0.65rem",letterSpacing:3,color:"#666",display:"block",marginBottom:7 }}>SPECIAL REQUESTS</label>
                  <textarea name="requests" rows={3} value={formData.requests} onChange={handleFormChange} placeholder="Dietary requirements, accessibility needs, special occasions..." />
                </div>
                <button className="btn-gold" style={{ width:"100%",fontSize:"0.8rem",letterSpacing:4,padding:"16px",animation:formData.name&&formData.email&&formData.checkin?"pulseGold 2s infinite":"none" }} onClick={handleFormSubmit}>
                  Send Reservation Request
                </button>
                <p style={{ fontSize:"0.7rem",color:"#555",textAlign:"center",marginTop:14,lineHeight:1.6 }}>🔒 Your information is encrypted and will never be shared.</p>
              </>
            )}
          </div>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.6rem",fontWeight:300,marginBottom:28,color:"#d4af37" }}>Find Us</h3>
            <div style={{ borderRadius:6,overflow:"hidden",marginBottom:28,border:"1px solid rgba(212,175,55,0.2)" }}>
              <iframe title="Hotel Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" width="100%" height="220" style={{ border:0,display:"block",filter:"invert(0.9) hue-rotate(200deg)" }} allowFullScreen loading="lazy" />
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:16,marginBottom:36 }}>
              {[["📍","1 Aurum Boulevard, Luxury Lane,\nBengaluru, India 560001"],["📞","+91 80 4567 8900"],["✉️","reservations@aurumresort.com"],["🕐","24/7 Concierge — Always Available"],["🚁","Helipad available — private arrivals"]].map(([icon,text])=>(
                <div key={text} style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 16px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(212,175,55,0.08)",borderRadius:4 }}>
                  <span style={{ fontSize:18,minWidth:24 }}>{icon}</span>
                  <span style={{ color:"#999",fontSize:"0.85rem",lineHeight:1.6,whiteSpace:"pre-line" }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))",border:"1px solid rgba(212,175,55,0.2)",borderRadius:6,padding:20 }}>
              <div style={{ fontSize:"0.65rem",letterSpacing:4,color:"#d4af37",marginBottom:10 }}>SOCIAL & COMMUNITY</div>
              <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                {["📸 Instagram","📘 Facebook","🐦 Twitter","▶️ YouTube","💼 LinkedIn"].map(s=>(
                  <span key={s} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,175,55,0.2)",padding:"6px 12px",fontSize:"0.72rem",color:"#aaa",borderRadius:3,cursor:"pointer",transition:"all 0.2s" }}
                    onMouseOver={e=>{ e.target.style.background="rgba(212,175,55,0.1)"; e.target.style.color="#d4af37"; }}
                    onMouseOut={e=>{ e.target.style.background="rgba(255,255,255,0.04)"; e.target.style.color="#aaa"; }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#030303",borderTop:"1px solid rgba(212,175,55,0.1)",padding:"52px 24px 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:40,marginBottom:48 }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond'",fontSize:22,fontWeight:300,letterSpacing:7,color:"#d4af37",marginBottom:14 }}>AURUM</div>
              <p style={{ color:"#555",fontSize:"0.8rem",lineHeight:1.8,maxWidth:260 }}>Where timeless luxury meets the art of living. An experience crafted for the extraordinary, since 2008.</p>
            </div>
            {[["Navigation",NAV_LINKS.slice(0,5)],["More",NAV_LINKS.slice(5)],["Contact",["reservations@aurumresort.com","+91 80 4567 8900","24H Concierge"]]].map(([title,items])=>(
              <div key={title}>
                <div style={{ fontSize:"0.62rem",letterSpacing:4,color:"#d4af37",marginBottom:16 }}>{title.toUpperCase()}</div>
                {items.map(item=>(
                  <div key={item} style={{ color:"#555",fontSize:"0.78rem",marginBottom:10,cursor:"pointer",transition:"color 0.2s" }}
                    onMouseOver={e=>e.target.style.color="#d4af37"} onMouseOut={e=>e.target.style.color="#555"}
                    onClick={()=>{ if(NAV_LINKS.includes(item)) scrollTo(item); }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(212,175,55,0.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
            <p style={{ color:"#3a3a3a",fontSize:"0.75rem",letterSpacing:1 }}>© 2026 Aurum Resort & Spa. All rights reserved.</p>
            <div style={{ display:"flex",gap:24 }}>
              {["Privacy Policy","Terms","Sitemap"].map(l=>(
                <span key={l} style={{ color:"#3a3a3a",fontSize:"0.72rem",cursor:"pointer" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important;}
          .hamburger{display:block!important;}
          [style*="grid-template-columns: 1.1fr 0.9fr"]{grid-template-columns:1fr!important;}
          [style*="grid-template-columns: 1.5fr 1fr 1fr 1fr"]{grid-template-columns:1fr 1fr!important;}
          [style*="grid-template-columns: repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </>
  );
}
