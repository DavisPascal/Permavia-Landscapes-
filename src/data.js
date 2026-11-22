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

// Blog posts and events are edited in Decap CMS (/admin) and stored as Markdown files in content/blog and content/events.
// Only published posts are included, newest first. Events are sorted by start date.
const { loadPosts, loadEvents } = require('./content');
const posts = loadPosts();
const events = loadEvents();

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

module.exports = { projects, services, posts, events, blogCategories, blogTags, fmtDate };
