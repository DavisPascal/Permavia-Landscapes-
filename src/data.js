// Content shared by more than one page: projects, services, blog posts.
const { img } = require('./components');

const projects = {
  'million-trees': {
    name: 'Million Trees', path: '/million-trees/', type: 'Tree Nursery',
    status: 'Underway: Establishing', stage: 2, badge: 'badge--fern', phase: 'underway',
    card: img('01-home__02-projects__card-1-million-trees'),
    short: 'A tree nursery being set up to grow seedlings for farms, homes and restoration sites, with the ambition of millions of trees in the ground.',
    now: 'Setting up the nursery and its first seedling beds.',
  },
  'permavia-farm': {
    name: 'Permavia Farm', path: '/permavia-farm/', type: 'Regenerative Demonstration Farm',
    status: 'Planning', stage: 2, badge: 'badge--gold', phase: 'planning',
    card: img('01-home__02-projects__card-2-permavia-farm'),
    short: 'A planned 5-acre living demonstration of regenerative land management: food forests, water systems, practical learning and farm-to-table experiences.',
    now: 'Planning the farm layout, zones and water systems.',
  },
  'permavia-academy': {
    name: 'Permavia Academy', path: '/permavia-academy/', type: 'Learning Platform',
    status: 'In Development', stage: 2, badge: '', phase: 'planning',
    card: img('01-home__02-projects__card-3-permavia-academy'),
    short: 'Our education platform for regenerative design and management: practical training, online learning and field demonstrations.',
    now: 'Developing the curriculum and first learning pathways.',
  },
};

const services = [
  {
    key: 'design', slug: 'regenerative-design', num: '01', icon: 'pen-tool', title: 'Regenerative Design', navLabel: 'Regenerative Design',
    short: 'Site assessment and a complete design for water, soil, plants and people.',
    purpose: 'Planning landscapes and land-use systems that work with natural processes, so your land holds water, builds soil and produces more every year.',
    desc: 'Every great landscape starts with careful observation. We walk your land, read its slopes, soils, water flows, wind and sun, then produce a clear, buildable design that turns problems into resources. You receive maps, planting plans and a phased budget you can act on, whether you build with us or on your own.',
    tags: ['Site Assessment', 'Water & Keyline Design', 'Food Forest Planning', 'Climate-Adaptive Layouts'],
    activities: [
      'Site visit and assessment: slopes, soils, water flows, sun, wind and existing vegetation',
      'Conversations about your goals, budget, timeline and how you use the land',
      'Concept design, then a detailed site plan with zones and placement',
      'Water-sensitive design: swales, ponds, keyline layouts and roof catchment',
      'Planting plans for regenerative gardens, food forests and agroforestry',
      'A phased budget and work plan you can build with us or on your own',
    ],
    problemsTitle: 'Problems a Good Design <em>Solves</em>',
    problems: [
      ['droplets', 'Water runs off or floods', 'Swales, ponds and contour planting slow rain down and sink it into the soil.'],
      ['mountain', 'Erosion and bare, tired ground', 'Ground cover, terraces and deep-rooted plants hold soil in place and rebuild it.'],
      ['sun', 'Hot, exposed compounds', 'Shade trees and windbreaks placed to cool buildings and outdoor spaces.'],
      ['wallet', 'High running costs', 'Perennial, low-input planting that needs less water, fertiliser and weeding over time.'],
      ['layout-grid', 'Space that does only one thing', 'Layouts where the same land gives food, shade, beauty and income.'],
      ['circle-help', 'No clear plan to follow', 'Maps, drawings and a phased budget so every step is clear before work begins.'],
    ],
    receive: ['Site assessment notes and base map', 'Concept and final design drawings', 'Planting plan and species list', 'Phased budget and work plan'],
    for: 'Homeowners, Farmers, Businesses, NGOs', cta: 'Request a consultation',
    image: img('03-services__02-service-01__landscape-design'),
  },
  {
    key: 'installation', slug: 'installation-community-projects', num: '02', icon: 'shovel', title: 'Installation of Regenerative & Community Development Projects', navLabel: 'Installation & Community Projects',
    short: 'Our crews build regenerative and community projects: earthworks, planting and water systems, done right.',
    purpose: 'Turning plans into functioning landscapes and projects, from site preparation and planting to community-led environmental and livelihood initiatives.',
    desc: 'Our trained field teams bring designs to life, on private land and in community development projects. We shape swales and ponds, prepare living soils, plant native and productive species, and install water-wise irrigation. For community projects we work alongside local people, so skills and ownership stay in the community. We manage the work from first dig to final planting, with clear milestones so you always know where your project stands.',
    tags: ['Earthworks & Swales', 'Native Planting', 'Irrigation Systems', 'Community Projects'],
    activities: [
      'Site preparation, marking out and earthworks (swales, ponds, terraces)',
      'Soil preparation: compost, mulch and soil biology',
      'Planting trees, food forests, gardens and ground cover',
      'Water systems: irrigation, roof catchment and storage',
      'Community mobilisation, training and shared planting days',
      'Clear milestones, progress updates and a handover pack',
    ],
    journey: [
      ['search', 'Assessment', 'We visit the site, confirm the design and agree goals, scope and budget with you and your partners.'],
      ['clipboard-list', 'Planning', 'A work plan with phases, materials, people, timing and the season to plant in.'],
      ['users', 'Mobilisation', 'We bring together the team, tools, seedlings and materials, and involve community members from the start.'],
      ['shovel', 'Installation', 'Earthworks, soil preparation, water systems and planting, built to the design.'],
      ['sprout', 'Establishment', 'Watering, mulching and replacement planting while the system takes root.'],
      ['handshake', 'Handover', 'A walk-through, a simple care guide and training so you or the community can manage it.'],
    ],
    partners: 'On community and development projects we work with NGOs, local government, schools and community groups as partners, not just beneficiaries. Local people help shape the plan, take part in the work and are trained to look after it, so the project keeps going after we step back.',
    for: 'Eco-developers, Resorts, Farms, NGOs & Communities', cta: 'Discuss a project',
    image: img('03-services__03-service-02__installation'),
  },
  {
    key: 'farm', slug: 'farm-solutions', num: '03', icon: 'trees', title: 'Farm Solutions', navLabel: 'Farm Solutions',
    short: 'Regenerative farm systems in line with permaculture: agroforestry, syntropic agroforestry, food forests and more.',
    purpose: 'Helping farms become more productive, resilient and ecologically healthy, using regenerative systems in line with permaculture.',
    desc: 'We help farms move away from costly inputs towards regenerative systems that build fertility year after year, all in line with permaculture principles. Depending on your land and goals, that can mean agroforestry, syntropic agroforestry (dense, layered planting that mimics natural forest succession), food forests, silvopasture with trees and livestock together, keyline water design, or composting and cover crops that rebuild living soil. Trees, crops and animals are integrated so each supports the other: shade, mulch, fodder, fruit, timber and income from the same land. Plans are practical, phased and matched to your markets.',
    tags: ['Agroforestry', 'Syntropic Agroforestry', 'Food Forests', 'Silvopasture', 'Soil Restoration'],
    systems: [
      ['tree-deciduous', 'Agroforestry', 'Trees grown with crops or pasture for shade, fodder, fruit, timber and soil fertility.'],
      ['layers', 'Syntropic Agroforestry', 'Dense, layered planting that copies natural forest succession and is pruned to feed the soil.'],
      ['trees', 'Food Forests', 'Layers of fruit, nut, herb and vine plants that give food for decades with little work.'],
      ['beef', 'Silvopasture', 'Trees and livestock together, so animals get shade and fodder and the land gets manure.'],
      ['waves', 'Keyline & Water Design', 'Contour lines, swales and ponds that spread water across the farm.'],
      ['recycle', 'Soil Building', 'Compost, mulch, cover crops and nitrogen-fixing trees instead of synthetic fertiliser.'],
    ],
    challengesTitle: 'Farm Challenges and <em>How We Respond</em>',
    challenges: [
      ['Soil is tired and yields keep falling', 'Rebuild organic matter with compost, mulch, cover crops and nitrogen-fixing trees.'],
      ['Fertiliser and chemical costs keep rising', 'A phased move to on-farm fertility, so you buy less each season.'],
      ['Dry spells hit harder every year', 'Swales, keyline layouts, ponds and tree cover that keep water in the land.'],
      ['Income depends on one crop', 'Mixed systems that add fruit, timber, fodder, honey and seedlings to what you grow now.'],
      ['Erosion on slopes', 'Contour planting, terraces and permanent ground cover.'],
      ['Animals and crops compete for land', 'Silvopasture and fodder trees that let both share the same land.'],
    ],
    expect: [
      ['search', 'Farm assessment', 'A visit to walk the farm with you, look at soil, water, crops, animals and markets, and agree what you want to change. You get a short summary of what we found and the options.'],
      ['map', 'Farm plan', 'A mapped, phased plan: which systems go where, which species, what it costs and when each step happens, built to protect your income during the change.'],
      ['shovel', 'Implementation', 'We can carry out the plan with you, train your farm team, supply seedlings from Million Trees and follow up through the first seasons.'],
    ],
    for: 'Smallholders, Commercial Farms, Cooperatives, Land Trusts', cta: 'Book a farm assessment',
    image: img('03-services__04-service-03__farm-agroforestry'),
  },
  {
    key: 'maintenance', slug: 'maintenance', num: '04', icon: 'sprout', title: 'Maintenance', navLabel: 'Maintenance',
    short: 'Seasonal care that keeps your landscape healthy, productive and beautiful.',
    purpose: 'Ongoing care and management, so landscapes, farms and installed systems stay healthy, working and valuable over time.',
    desc: 'Regenerative work does not end at installation. Living systems grow stronger with the right care at the right time. Our maintenance plans cover seasonal planting, pruning, mulching, soil monitoring and water system checks, so your landscape matures into a self-sustaining ecosystem instead of a costly upkeep burden.',
    tags: ['Seasonal Planting', 'Soil Monitoring', 'Water System Care', 'Annual Health Checks'],
    care: [
      ['calendar-check', 'Scheduled care', 'Visits planned around the seasons: pruning, mulching, weeding and chop-and-drop.'],
      ['activity', 'Monitoring', 'Simple records of plant growth, soil cover and water, so you can see the change.'],
      ['leaf', 'Plant health', 'Early checks for pests and disease, handled with natural methods first.'],
      ['droplets', 'Soil & water management', 'Compost and mulch top-ups, and checks on swales, ponds, tanks and irrigation.'],
      ['sprout', 'Replacement planting', 'Replacing plants that fail and adding new layers as the system matures.'],
      ['clipboard-check', 'Performance reviews', 'A yearly review of what is working, what to change and what to plan next.'],
    ],
    careNote: 'Each plan is agreed with you. You choose the visits and tasks that fit your site and budget.',
    for: 'Homeowners, Hotels & Resorts, Schools, Institutions', cta: 'Get a maintenance plan',
    image: img('03-services__05-service-04__maintenance'),
  },
  {
    key: 'education', slug: 'education', num: '05', icon: 'graduation-cap', title: 'Education for Regenerative Design & Management', navLabel: 'Education',
    short: 'Hands-on training in designing and managing regenerative land, skills your team can use the next day.',
    purpose: 'Building practical knowledge and skills through training, demonstrations, workshops, learning resources and online education.',
    desc: 'We train individuals, staff teams and communities to design and manage regenerative land themselves, from site design and water harvesting to running food forests, carbon markets and programme design. Training is hands-on and rooted in East African conditions. It is delivered on your site, at partner venues or online, and on Permavia Farm once it opens.',
    tags: ['Landscape Design Training', 'Carbon Markets', 'Programme Design', 'Leadership & Facilitation'],
    formats: [
      ['graduation-cap', 'Courses', 'Structured courses, including a Permaculture Design Course, through Permavia Academy.'],
      ['shovel', 'Workshops & field days', 'Short, hands-on sessions on water harvesting, soil, food forests and more.'],
      ['eye', 'Demonstrations', 'See regenerative systems being built and managed in the field.'],
      ['monitor', 'Online learning', 'Lessons you can take anywhere, paired with practical tasks on your own land.'],
      ['building-2', 'Training for organisations', 'Tailored programmes for NGO, government and company teams.'],
    ],
    outcomes: [
      'Read a site and draw a simple regenerative design',
      'Plan and build water-harvesting earthworks',
      'Make compost and rebuild living soil',
      'Establish and manage food forests and agroforestry',
      'Plan, run and monitor a regenerative project',
    ],
    for: 'Individuals, NGO Staff, Corporate Teams, Government', cta: 'Explore Permavia Academy', ctaHref: '/permavia-academy/',
    image: img('03-services__06-service-05__education'),
  },
];
services.forEach((s) => { s.path = `/services/${s.slug}/`; });

// Blog: seven main categories (the blog's main navigation) and tags that organise articles further.
// To file an article: give it one `category` (a name below) and a few `tags` (names below).
const slugify = (t) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const blogCategories = [
  ['Regenerative Design', 'pen-tool', 'Landscape design, permaculture, food forests, ecological planning, sustainable gardens and nature-based design.'],
  ['Agroforestry & Farm Solutions', 'tractor', 'Agroforestry, farm planning, soil health, water management, integrated farming and productive landscapes.'],
  ['Ecological Restoration', 'trees', 'Tree growing, biodiversity, degraded land restoration, reforestation and community-based environmental projects.'],
  ['Project Implementation', 'shovel', 'Practical project delivery, installation processes, community development, field experiences and lessons from implementation.'],
  ['Landscape & Farm Management', 'sprout', 'Landscape maintenance, tree care, farm management, monitoring, plant health and long-term sustainability.'],
  ['Regenerative Education', 'graduation-cap', 'Training, practical guides, regenerative skills, workshops, research and professional development.'],
  ['Projects & Field Stories', 'map', "Updates, milestones, case studies and stories from Permavia's own projects and activities."],
].map(([name, icon, covers]) => ({ name, icon, covers, slug: slugify(name) }));
const blogTags = ['Permavia Farm', 'Million Trees', 'Permavia Academy', 'Permaculture', 'Food Forests', 'Soil Health', 'Water Management',
  'Tree Growing', 'Community Development', 'Sustainable Agriculture', 'Biodiversity', 'East Africa'].map((name) => ({ name, slug: slugify(name) }));

// Blog: published posts only. Newest first.
const posts = [
  {
    slug: 'harvesting-rain-water-systems', category: 'Agroforestry & Farm Solutions',
    tags: ['Water Management', 'Soil Health', 'Permaculture', 'Sustainable Agriculture', 'East Africa'],
    title: 'Harvesting Rain: Simple Water Systems for Ugandan Homes and Farms',
    seoTitle: 'Rainwater Harvesting for Homes & Farms in Uganda',
    summary: "To get water through the dry season in Uganda, slow rainwater down, spread it out and sink it into the soil. Start with roof catchment (a 100 m² roof collects about 1,000 litres for every 10 mm of rain), add swales dug on contour to store water in the soil, and use ponds or infiltration basins where the land allows.",
    faqs: [["How much water can a roof collect in Uganda?","About 1,000 litres for every 10 mm of rain on a 100 m² roof. Gutters, a first-flush diverter and a covered tank turn that into clean water for the house, kitchen garden and young trees."],["What is a swale?","A shallow ditch dug exactly along the contour, with the soil piled on the downhill side as a mound. It catches rain running down the slope and lets it soak in; trees planted on the mound use that moisture long after the rain stops."],["How do I lay out a swale on contour?","Use a simple A-frame or a water level, never by eye, and always build a safe, stable spillway for heavy storms."],["Where should I start with water harvesting?","Watch your land during the next heavy rain: where water runs, pools or cuts channels is where to act first. Permavia can walk your site and design a water plan for your slope, soil and budget."]],
    excerpt: 'Two rainy seasons, two dry ones. Swales, ponds and roof catchment turn that rhythm into year-round water for your land.',
    date: '2026-10-20', read: 6, image: img('01-home__07-inspiration__tile-2-water-systems'),
    body: `
<p>Much of East Africa receives generous rain, yet many homes and farms still run short of water in the dry months. The problem is rarely how much rain falls. It is how quickly that water leaves the land. Regenerative design slows it down, spreads it out and sinks it into the soil, where plants can use it for months.</p>
<h2>How much rain can your roof collect?</h2>
<p>A typical 100 square metre roof collects about 1,000 litres for every 10 mm of rain. Gutters, a first-flush diverter and a covered tank turn that into clean water for the house, the kitchen garden and young trees. Overflow is then directed into the landscape rather than onto the road.</p>
<h2>What is a swale, and how does it store water?</h2>
<p>A swale is a shallow ditch dug exactly along the contour, with the soil piled on the downhill side to form a mound. Rain running down the slope is caught, spreads along the swale and soaks in. Trees planted on the mound tap into that moisture long after the rain stops.</p>
<ul>
<li>Lay out swales with a simple A-frame or water level, never by eye.</li>
<li>Plant the mound immediately with fruit trees, nitrogen fixers and groundcover.</li>
<li>Always build a safe, stable spillway for heavy storms.</li>
</ul>
<h2>Ponds and infiltration basins</h2>
<p>Where the land allows, a pond stores surface water for animals, irrigation and fish, and it cools the area around it. Smaller infiltration basins near the house catch runoff from paths and yards and recharge the groundwater.</p>
<blockquote>The cheapest place to store water is in healthy, living soil. Every 1% increase in organic matter helps a hectare hold tens of thousands of extra litres.</blockquote>
<h2>Where should you begin?</h2>
<p>Observe your land in the next heavy rain. Where does water run, pool or cut channels? Those are the places to act first. If you would like a water plan for your site, our team can walk it with you and design a system matched to your slope, soil and budget.</p>`,
  },
  {
    slug: 'why-landscaping-is-more-than-just-beauty', category: 'Regenerative Design',
    tags: ['Food Forests', 'Permaculture', 'Biodiversity', 'Soil Health'],
    title: 'Why Landscaping Is More Than Just Beauty',
    seoTitle: 'Why Landscaping Is More Than Just Beauty | Permavia',
    summary: "Regenerative landscaping keeps the beauty of a garden but makes it work for you: fruit trees, perennial vegetables and herbs feed your family, well-placed trees cool your home and block wind, and mulch and groundcover protect the soil, which lowers water, fertiliser and food costs over time.",
    faqs: [["What is regenerative landscaping?","A way of designing gardens and land so that they improve over time: producing food, holding water, building healthy soil and supporting wildlife, instead of needing ever more water, fertiliser and labour."],["What is a food forest?","A garden planted in layers like a natural forest (tall canopy trees, smaller fruit trees, shrubs, herbs, groundcover and root crops) that produces food year after year with little digging once established."],["Can a productive garden still look beautiful?","Yes. Fruit trees, perennial vegetables, herbs and climbing beans can be arranged as attractively as any ornamental garden, with shaded paths, blossom and moving water."],["How does landscaping lower costs?","Over time you buy less water, fertiliser and food, because the garden produces food, stores rain and feeds its own soil through mulch and diverse roots."]],
    excerpt: 'A well-designed landscape can feed your family, cool your home, hold water and lower your costs, while still looking beautiful.',
    date: '2026-09-12', read: 5, image: img('10-blog__posts__featured-why-landscaping-is-more-than-beauty'),
    body: `
<p>For a long time, landscaping meant lawns, hedges and flower beds that looked good and asked a lot in return: water, fertiliser, labour. Regenerative landscaping keeps the beauty but changes the deal. Your garden starts working for you.</p>
<h2>Can a garden be beautiful and feed you?</h2>
<p>Fruit trees, perennial vegetables, herbs and climbing beans can be arranged as attractively as any ornamental garden. In a food forest, layers of plants grow together the way they do in a natural forest: tall canopy trees, smaller fruit trees, shrubs, herbs, groundcover and roots. Once established, this system produces food year after year with little digging.</p>
<h2>A landscape that cools and protects</h2>
<p>Well-placed trees shade walls and roofs, cutting indoor temperatures. Windbreaks shelter homes and crops from wind and sun. Groundcover protects soil from the hard rains that otherwise wash it away.</p>
<ul>
<li><strong>Lower costs:</strong> less bought-in water, fertiliser and food over time.</li>
<li><strong>Healthier soil:</strong> mulch and diverse roots feed soil life instead of depleting it.</li>
<li><strong>More life:</strong> birds, bees and beneficial insects return and keep pests in balance.</li>
</ul>
<h2>Beauty with purpose</h2>
<p>None of this means giving up on beauty. The most memorable landscapes are the ones that feel alive: shaded paths, the scent of fruit blossom, water moving through the land. That is the kind of beauty that grows richer with every season.</p>
<p>Whether you have a small compound or many acres, we can help you design a landscape that is as productive as it is beautiful.</p>`,
  },
  {
    slug: 'transforming-spaces-the-art-of-green-design', category: 'Regenerative Design',
    tags: ['Permaculture', 'Tree Growing', 'Food Forests', 'Sustainable Agriculture'],
    title: 'Transforming Spaces: The Art of Green Design',
    seoTitle: 'Green Design: Transforming Spaces in Uganda | Permavia',
    summary: "Good green design starts by observing a site (sun, wind, water and how people move) before changing anything. Permaculture then organises the land into zones by how often you visit them, and agroforestry uses trees as the backbone, providing shade, fruit, fodder, timber and mulch while feeding and holding the soil.",
    faqs: [["What are permaculture zones?","A way of placing things by how often you use them: herbs and vegetables you pick daily sit closest to the kitchen, fruit trees come next, then woodlots and wilder areas further out. It saves time, water and energy every day."],["Why are trees important in agroforestry?","Trees provide shade, fruit, fodder, timber and mulch, fix nitrogen and hold the soil together, so crops and animals woven around them do better."],["Which trees should I plant first?","Indigenous and well-adapted species first, with nitrogen-fixing trees mixed among fruit and timber trees. Always plan for each tree’s mature size, not its size at planting."],["What should I do before designing my garden or farm?","Observe it: how the sun moves through the day and year, where the wind comes from, where water flows and pools, and how people move through the space."]],
    excerpt: 'How careful observation, smart placement and the right plants transform tired, bare ground into thriving green spaces.',
    date: '2026-08-04', read: 5, image: img('10-blog__posts__featured-transforming-spaces-green-design'),
    body: `
<p>Every site has a story written in its slopes, soils and shade. Green design begins by reading that story before changing anything. The result is a space that fits its place, rather than one that fights it.</p>
<h2>Observe before you design</h2>
<p>We spend time understanding how sun moves across a site through the day and the year, where wind comes from, where water flows and pools, and how people actually move through the space. Those observations shape every decision that follows.</p>
<h2>What are permaculture zones?</h2>
<p>Permaculture design organises a site into zones by how often you visit them. Herbs and vegetables you use daily sit closest to the kitchen. Fruit trees come next, then larger woodlots and wilder areas further out. This simple idea saves time, water and energy every single day.</p>
<h2>Why are trees the backbone of agroforestry?</h2>
<p>In agroforestry, trees are the backbone of the design. They provide shade, fruit, fodder, timber and mulch, fix nitrogen and hold the soil together. Crops and animals are woven around them so that each element supports several others.</p>
<ul>
<li>Choose indigenous and well-adapted species first.</li>
<li>Mix nitrogen-fixing trees among fruit and timber trees.</li>
<li>Plan for the mature size of each tree, not its size at planting.</li>
</ul>
<h2>Designing for change</h2>
<p>A green space is never finished. It grows, matures and changes over decades. Good design anticipates that journey, so the landscape becomes more productive and more beautiful with time, and needs less from you as it does.</p>`,
  },
];

// Check every article uses a known category and known tags (the build stops with a clear message if not).
const catBySlug = Object.fromEntries(blogCategories.map((c) => [c.name, c]));
const tagByName = Object.fromEntries(blogTags.map((t) => [t.name, t]));
posts.forEach((p) => {
  if (!catBySlug[p.category]) throw new Error(`Blog post "${p.slug}": unknown category "${p.category}". Use one of: ${blogCategories.map((c) => c.name).join(', ')}`);
  (p.tags || []).forEach((t) => { if (!tagByName[t]) throw new Error(`Blog post "${p.slug}": unknown tag "${t}". Add it to blogTags in src/data.js first.`); });
  p.categorySlug = catBySlug[p.category].slug;
  p.tagSlugs = (p.tags || []).map((t) => tagByName[t].slug);
});

const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

module.exports = { projects, services, posts, blogCategories, blogTags, fmtDate };
