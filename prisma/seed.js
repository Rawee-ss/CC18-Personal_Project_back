const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("123456", 10); // hash no async

const usersData = [
  {
    userName: "Manager",
    email: "manager@games.com",
    password: hashedPassword,
    role: "ADMIN",
  },
  {
    userName: "Anny",
    email: "anny@games.com",
    password: hashedPassword,
    role: "USER",
  },

  {
    userName: "Bobby",
    email: "bobby@games.com",
    password: hashedPassword,
    role: "USER",
  },
  {
    userName: "Candy",
    email: "candy@games.com",
    password: hashedPassword,
    role: "USER",
  },
  {
    userName: "Danny",
    email: "danny@games.com",
    password: hashedPassword,
    role: "USER",
  },
];

const gamesData =[
  {
    name:"The Last Of Us Part 1",
    image:"https://i.pinimg.com/564x/e3/f3/9e/e3f39e5c4b3dcfb3b0caf8f3a17515ba.jpg",
    detail:"Discover the award-winning game that inspired the critically acclaimed television show. Guide Joel and Ellie through a post-apocalyptic America, and encounter unforgettable allies and enemies in The Last of Us™.",
    price:"1690"
  },
  {
    name:"Resident Evil 4",
    image:"https://i.pinimg.com/564x/43/e4/ee/43e4ee7fd7edbd8ed2c3959ae35aef7c.jpg",
    detail:"Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.",
    price:"1339"
  },
  {
    name:"Resident Evil 3",
    image:"https://image.api.playstation.com/vulcan/ap/rnd/202206/0307/CFAf8koMK6B49DCY5Zk6xFYj.jpg",
    detail:"Jill Valentine is one of the last remaining people in Raccoon City to witness the atrocities Umbrella performed. To stop her, Umbrella unleashes their ultimate secret weapon: Nemesis! Also includes Resident Evil Resistance, a new 1 vs 4 online multiplayer game set in the Resident Evil universe.",
    price:"1189"
  },
  {
    name:"Resident Evil 2",
    image:"https://notebookspec.com/web/wp-content/uploads/2019/01/resident_evil_2_remake_demo_1547205306501.jpg",
    detail:"A deadly virus engulfs the residents of Raccoon City in September of 1998, plunging the city into chaos as flesh eating zombies roam the streets for survivors. An unparalleled adrenaline rush, gripping storyline, and unimaginable horrors await you. Witness the return of Resident Evil 2.",
    price:"799"
  },
  {
    name:"Resident Evil Village",
    image:"https://img.youtube.com/vi/ZSJJLSxEkZw/maxresdefault.jpg",
    detail:"Experience survival horror like never before in the 8th major installment in the Resident Evil franchise - Resident Evil Village. With detailed graphics, intense first-person action and masterful storytelling, the terror has never felt more realistic.",
    price:"1289"
  },
  {
    name:"Coral Island",
    image:"https://www.humblegames.com/wp-content/uploads/2022/03/Coral-Island-Key-Art-1920x1080-1.png",
    detail:"Coral Island is a vibrant and laid-back reimagining of farm sim games. Be who you want and experience enchanting island living at your own pace—live off the land, nurture animals, build relationships with a diverse cast of townsfolk, and make the world around you a more vital and harmonious place.",
    price:"580"
  },
  {
    name:"Railbound",
    image:"https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1967510/capsule_616x353.jpg?t=1729063498",
    detail:"A relaxing puzzle game about fixing train connections and travelling the world!",
    price:"275"
  },
  {
    name:"Fallout 76",
    image:"https://images.ctfassets.net/rporu91m20dc/591IIPXQfXH2DdXnvLOs2p/733b6fa0d1b065cd31b5a4be4ca4f353/F76_AtlanticCity_StandardEdition_Horizontal__Medium_.jpg?w=1066&h=600&fit=thumb",
    detail:"Bethesda Game Studios welcome you to Fallout 76. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers emerge into post-nuclear America. Explore a vast wasteland in this open-world multiplayer addition to the Fallout story.",
    price:"1310"
  },
  {
    name:"Dead by Daylight",
    image:"https://gamingbolt.com/wp-content/uploads/2022/03/dead-by-daylight.jpg",
    detail:"Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer, and the other four players play as Survivors, trying to escape the Killer and avoid being caught and killed.",
    price:"399"
  },
  {
    name:"Assassin's Creed Mirage",
    image:"https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Share_Image_1920x1080_1920x1080-99523a03a01c7cf17f25e60ebab90160",
    detail:"Experience the story of Basim, a cunning street thief with nightmarish visions, seeking answers and justice as he navigates the bustling streets of ninth-century Baghdad.",
    price:"1499"
  },
  {
    name:"Planet Zoo",
    image:"https://www.planetzoogame.com/images/og_image.jpg",
    detail:"Build a world for wildlife in Planet Zoo. From the developers of Planet Coaster and Zoo Tycoon comes the ultimate zoo sim. Construct detailed habitats, manage your zoo, and meet authentic living animals who think, feel and explore the world you create around them.",
    price:"975"
  },
  {
    name:"Green Hell",
    image:"https://greenhell-game.com/wp-content/uploads/2024/09/GH-Decorations-KeyArt-1920x1080_v9_low.jpg",
    detail:"Plunge into the open world survival simulation set in the extreme conditions of the uncharted Amazon jungle. Use real-life survival techniques to craft, hunt, fight and gather resources, set a makeshift shelter or raise a fortress. Tend your wounds and maintain mental health - alone or with friends.",
    price:"319"
  },
  {
    name:"HITMAN World of Assassination",
    image:"https://image.api.playstation.com/vulcan/ap/rnd/202301/2315/AV5D2dPmPZL9CT3IdveGCGJZ.jpg",
    detail:"Enter the world of the ultimate assassin. HITMAN World of Assassination brings together the best of HITMAN, HITMAN 2 and HITMAN 3 including the main campaign, contract mode, escalations, elusive target arcades and the roguelike inspired game mode HITMAN: Freelancer.",
    price:"590"
  },
  {
    name:"Fallout 4",
    image:"https://image.api.playstation.com/vulcan/ap/rnd/202009/2502/rB3GRFvdPmaALiGt89ysflQ4.jpg",
    detail:"Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.",
    price:"660"
  },
  {
    name:"FOR HONOR™",
    image:"https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7Gvgp3BRN1mNtb18XICaRZ/344574f0aeb0b75b94531572dbbcdcf6/ForHonor_og_meta.jpg",
    detail:"Fight alone or with friends in For Honor, a third-person hero-based melee fighting game. Enter the chaos of war as a Knight, a Viking, a Samurai, a Wu Lin, or an Outlander. Fight in brutal PvP and team-oriented modes, or play the thrilling story campaign.",
    price:"859"
  },
  {
    name:"Dead Island 2",
    image:"https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S1_2560x1440-fdc688ce46680914ee3c4a7949ce8a67",
    detail:"A deadly virus is spreading across Los Angeles, turning its inhabitants into zombies. Bitten, infected, but more than just immune, uncover the truth behind the outbreak and discover who - or what - you are. Survive, evolve and become the ultimate Zombie Slayer.",
    price:"1186"
  },
  {
    name:"Sid Meier's Civilization® VI",
    image:"https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000013704/918c0badde3aeba760e2185f382a2402248a1292322cf540fd8d098eeb292e1e",
    detail:"Civilization VI is the newest installment in the award winning Civilization Franchise. Expand your empire, advance your culture and go head-to-head against history's greatest leaders. Will your civilization stand the test of time?",
    price:"1600"
  },
  {
    name:"Wartales",
    image:"https://external-preview.redd.it/wartales-1-0-is-out-now-wartales-launches-out-of-early-v0-o1zjiCNXvlBNVcm_gEyrMYMjWjj1zdLlO3s4FIM_FSw.jpg?auto=webp&s=9e0ebd4c11528af21f55941284ca7fa8a9c49666",
    detail:"Wartales is an open world RPG in which you lead a group of mercenaries in their search for wealth across a massive medieval universe. Explore the world, recruit companions, collect bounties and unravel the secrets of the tombs of the ancients!",
    price:"886"
  },
  {
    name:"Rise of the Tomb Raider™",
    image:"https://fanatical.imgix.net/product/original/162d9fe8-6dbf-4463-82c6-a01b8d3a6e2b.jpeg?auto=compress,format&w=870&fit=crop&h=489",
    detail:"Rise of the Tomb Raider: 20 Year Celebration includes the base game and Season Pass featuring all-new content. Explore Croft Manor in the new “Blood Ties” story, then defend it against a zombie invasion in “Lara's Nightmare”.",
    price:"789"
  },
  {
    name:"Hunt: Showdown 1896",
    image:"https://cdnb.artstation.com/p/media_assets/images/images/001/294/357/large/Trace_blog_ArtStation_Hunt_(1).jpg?1723736265",
    detail:"Hunt: Showdown 1896 is a new era of the addictively unforgiving extraction shooter. In corrupted backwaters lost to history, fight back alone – or with friends – against timeless evil. Twisted monsters and other ruthless Hunters stand between you and your Bounty. Risk everything as Hunt consumes you",
    price:"619"
  },
  {
    name:"DREDGE",
    image:"https://static.wixstatic.com/media/e609d3_dbc3f1ee8e294d579331eaa261025e4c~mv2.png/v1/fit/w_2500,h_1330,al_c/e609d3_dbc3f1ee8e294d579331eaa261025e4c~mv2.png",
    detail:"DREDGE is a single-player fishing adventure with a sinister undercurrent. Sell your catch, upgrade your boat, and dredge the depths for long-buried secrets. Explore a mysterious archipelago and discover why some things are best left forgotten.",
    price:"750"
  },
  {
    name:"Timberborn",
    image:"https://cdn1.epicgames.com/offer/3a1067df83654812b976101174e1904f/EGS_Timberborn_Mechanistry_S1_2560x1440-7f7ccdc49fadc874fa38ff7aca560d59",
    detail:"Humans are long gone. In a world struck by droughts and toxic waste, will your lumberpunk beavers do any better? A city-building game featuring ingenious animals, vertical architecture, water physics, and terraforming. Contains high amounts of wood.",
    price:"495"
  },
  {
    name:"Shin chan: Shiro and the Coal Town",
    image:"https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_ShinChanShiroAndTheCoalTown_GBen_image1600w.jpg",
    detail:"Shin chan starts a mysterious daily routine, traveling between two worlds: the Village in Akita and Coal Town.",
    price:"1099"
  },
  {
    name:"The Quarry",
    image:"https://image.api.playstation.com/vulcan/ap/rnd/202203/0903/BRSykxZAAT0OuPrG5nJz19fg.jpg",
    detail:"When the sun goes down on the last night of summer camp, nine teenage counselors are plunged into an unpredictable night of horror. The only thing worse than the blood-drenched locals and creatures hunting them are the unimaginable choices you must make to help them survive.",
    price:"1490"
  },
  {
    name:"Worshippers of Cthulhu",
    image:"https://gagadget.com/media/uploads/hq720-2.jpg",
    detail:"LEAD the CULT OF CTHULHU. Decide the fate of your followers, perform eldritch rituals, and master the art of city-building in a world where the line between sanity and madness blurs. Can you endure the horrors you unleash?",
    price:"495"
  },
  {
    name:"Ale & Tale Tavern",
    image:"https://preview.redd.it/our-game-ale-tale-tavern-is-out-on-steam-v0-lns3xu8octnd1.png?auto=webp&s=c83c535321a3ffb0048a1b950c333ff1b9610bd1",
    detail:"Get ready for a thrilling mix of genres: a cooperative, first-person, open-world fantasy tavern simulator, action, fishing, hunting, exploration, and completing fun and diverse quests. And, of course, COOKING! Play with friends, feed and quench the thirst of the entire world!",
    price:"315"
  },
  {
    name:"Shadow of the Tomb Raider: Definitive Edition",
    image:"https://gaming-cdn.com/images/products/12327/orig/shadow-of-the-tomb-raider-definitive-edition-xbox-one-xbox-series-x-s-definitive-edition-xbox-series-x-s-xbox-one-game-microsoft-store-turkey-cover.jpg?v=1718610902",
    detail:"As Lara Croft races to save the world from a Maya apocalypse, she must become the Tomb Raider she is destined to be.",
    price:"531"
  },
  // {
  //   name:"",
  //   image:"",
  //   detail:"",
  //   price:""
  // },
]

async function run() {
  await prisma.user.createMany({
    data: usersData,
  });
  await prisma.products.createMany({
    data: gamesData,
  });
}

console.log("DB seed...");
run();
