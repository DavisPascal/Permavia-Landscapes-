// Content shared by more than one page: projects, services, blog posts.
const { img } = require('./components');

const projects = {
  'million-trees': {
    name: 'Million Trees', path: '/million-trees/', type: 'Tree Nursery',
    status: 'Establishing', stage: 2, badge: 'badge--fern',
    card: img('01-home__02-projects__card-1-million-trees'),
    short: 'A community tree nursery growing millions of trees for farms, homes and restoration sites across Africa.',
  },
  'permavia-farm': {
    name: 'Permavia Farm', path: '/permavia-farm/', type: '5-Acre Regenerative Farm',
    status: 'Planning', stage: 2, badge: 'badge--gold',
    card: img('01-home__02-projects__card-2-permavia-farm'),
    short: 'A 5-acre living demonstration farm with food forests, water systems, farm-to-table dining and stays.',
  },
  'permavia-academy': {
    name: 'Permavia Academy', path: '/permavia-academy/', type: 'Learning Platform · permavia.edu',
    status: 'Early Stage', stage: 2, badge: '',
    card: img('01-home__02-projects__card-3-permavia-academy'),
    short: 'Practical regenerative training, online for reach and on-farm for depth, grounded in African reality.',
  },
};

const services = [
  {
    key: 'design', num: '01', icon: 'pen-tool', title: 'Regenerative Landscape Design',
    short: 'Site assessment and a complete design for water, soil, plants and people.',
    desc: 'Every great landscape starts with careful observation. We walk your land, read its slopes, soils, water flows, wind and sun, then produce a clear, buildable design that turns problems into resources. You receive maps, planting plans and a phased budget you can act on, whether you build with us or on your own.',
    tags: ['Site Assessment', 'Water & Keyline Design', 'Food Forest Planning', 'Climate-Adaptive Layouts'],
    for: 'Homeowners, Farmers, Businesses, NGOs', cta: 'Request a consultation',
    image: img('03-services__02-service-01__landscape-design'),
  },
  {
    key: 'installation', num: '02', icon: 'shovel', title: 'Installation & Regenerative Projects',
    short: 'Our crews build the design: earthworks, planting and irrigation, done right.',
    desc: 'Our trained field teams bring designs to life. We shape swales and ponds, prepare living soils, plant native and productive species, and install water-wise irrigation. We manage the work from first dig to final planting, with clear milestones so you always know where your project stands.',
    tags: ['Earthworks & Swales', 'Native Planting', 'Irrigation Systems', 'Soil Biology Setup'],
    for: 'Eco-developers, Resorts, Farms, Corporate Campuses', cta: 'Start your project',
    image: img('03-services__03-service-02__installation'),
  },
  {
    key: 'farm', num: '03', icon: 'trees', title: 'Farm & Agroforestry Solutions',
    short: 'Move your farm to regenerative and agroforestry systems that pay back.',
    desc: 'We help farms move away from costly inputs towards systems that build fertility year after year. Trees, crops and animals are integrated so each supports the other: shade, mulch, fodder, fruit, timber and income from the same land. Plans are practical, phased and matched to your markets.',
    tags: ['Agroforestry Planning', 'Silvopasture', 'Soil Restoration', 'Carbon Sequestration'],
    for: 'Smallholders, Commercial Farms, Cooperatives, Land Trusts', cta: 'Transform your farm',
    image: img('03-services__04-service-03__farm-agroforestry'),
  },
  {
    key: 'maintenance', num: '04', icon: 'sprout', title: 'Landscape Maintenance & Ecosystem Management',
    short: 'Seasonal care that keeps your landscape healthy, productive and beautiful.',
    desc: 'Living systems grow stronger with the right care at the right time. Our maintenance plans cover seasonal planting, pruning, mulching, soil monitoring and water system checks, so your landscape matures into a self-sustaining ecosystem instead of a costly upkeep burden.',
    tags: ['Seasonal Planting', 'Soil Monitoring', 'Water System Care', 'Annual Health Checks'],
    for: 'Homeowners, Hotels & Resorts, Schools, Institutions', cta: 'Get a maintenance plan',
    image: img('03-services__05-service-04__maintenance'),
  },
  {
    key: 'education', num: '05', icon: 'graduation-cap', title: 'Education & Regenerative Training',
    short: 'Hands-on training that builds skills your team can use the next day.',
    desc: 'We train individuals, staff teams and communities in the practical skills of regeneration, from landscape design and water harvesting to carbon markets and programme design. Training is hands-on, rooted in East African conditions, and delivered on-site, on our farm or online.',
    tags: ['Landscape Design Training', 'Carbon Markets', 'Programme Design', 'Leadership & Facilitation'],
    for: 'Individuals, NGO Staff, Corporate Teams, Government', cta: 'Explore Permavia Academy', ctaHref: '/permavia-academy/',
    image: img('03-services__06-service-05__education'),
  },
];

// Blog: published posts only. Newest first.
const posts = [
  {
    slug: 'harvesting-rain-water-systems', category: 'Water',
    title: 'Harvesting Rain: Simple Water Systems for Ugandan Homes and Farms',
    seoTitle: 'Rainwater Harvesting for Homes & Farms in Uganda',
    excerpt: 'Two rainy seasons, two dry ones. Swales, ponds and roof catchment turn that rhythm into year-round water for your land.',
    date: '2026-10-20', read: 6, image: img('01-home__07-inspiration__tile-2-water-systems'),
    body: `
<p>Western Uganda receives generous rain, yet many homes and farms still run short of water in the dry months. The problem is rarely how much rain falls. It is how quickly that water leaves the land. Regenerative design slows it down, spreads it out and sinks it into the soil, where plants can use it for months.</p>
<h2>Start with the roof</h2>
<p>A typical 100 square metre roof collects about 1,000 litres for every 10 mm of rain. Gutters, a first-flush diverter and a covered tank turn that into clean water for the house, the kitchen garden and young trees. Overflow is then directed into the landscape rather than onto the road.</p>
<h2>Swales: storing water in the soil</h2>
<p>A swale is a shallow ditch dug exactly along the contour, with the soil piled on the downhill side to form a mound. Rain running down the slope is caught, spreads along the swale and soaks in. Trees planted on the mound tap into that moisture long after the rain stops.</p>
<ul>
<li>Lay out swales with a simple A-frame or water level, never by eye.</li>
<li>Plant the mound immediately with fruit trees, nitrogen fixers and groundcover.</li>
<li>Always build a safe, stable spillway for heavy storms.</li>
</ul>
<h2>Ponds and infiltration basins</h2>
<p>Where the land allows, a pond stores surface water for animals, irrigation and fish, and it cools the area around it. Smaller infiltration basins near the house catch runoff from paths and yards and recharge the groundwater.</p>
<blockquote>The cheapest place to store water is in healthy, living soil. Every 1% increase in organic matter helps a hectare hold tens of thousands of extra litres.</blockquote>
<h2>Where to begin</h2>
<p>Observe your land in the next heavy rain. Where does water run, pool or cut channels? Those are the places to act first. If you would like a water plan for your site, our team can walk it with you and design a system matched to your slope, soil and budget.</p>`,
  },
  {
    slug: 'why-landscaping-is-more-than-just-beauty', category: 'Food Forests',
    title: 'Why Landscaping Is More Than Just Beauty',
    seoTitle: 'Why Landscaping Is More Than Just Beauty | Permavia',
    excerpt: 'A well-designed landscape can feed your family, cool your home, hold water and lower your costs, while still looking beautiful.',
    date: '2026-09-12', read: 5, image: img('10-blog__posts__featured-why-landscaping-is-more-than-beauty'),
    body: `
<p>For a long time, landscaping meant lawns, hedges and flower beds that looked good and asked a lot in return: water, fertiliser, labour. Regenerative landscaping keeps the beauty but changes the deal. Your garden starts working for you.</p>
<h2>A landscape that feeds you</h2>
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
    slug: 'transforming-spaces-the-art-of-green-design', category: 'Agroforestry',
    title: 'Transforming Spaces: The Art of Green Design',
    seoTitle: 'Green Design: Transforming Spaces in Uganda | Permavia',
    excerpt: 'How careful observation, smart placement and the right plants transform tired, bare ground into thriving green spaces.',
    date: '2026-08-04', read: 5, image: img('10-blog__posts__featured-transforming-spaces-green-design'),
    body: `
<p>Every site has a story written in its slopes, soils and shade. Green design begins by reading that story before changing anything. The result is a space that fits its place, rather than one that fights it.</p>
<h2>Observe before you design</h2>
<p>We spend time understanding how sun moves across a site through the day and the year, where wind comes from, where water flows and pools, and how people actually move through the space. Those observations shape every decision that follows.</p>
<h2>Zones: put things where they belong</h2>
<p>Permaculture design organises a site into zones by how often you visit them. Herbs and vegetables you use daily sit closest to the kitchen. Fruit trees come next, then larger woodlots and wilder areas further out. This simple idea saves time, water and energy every single day.</p>
<h2>Trees as the backbone</h2>
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

const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

module.exports = { projects, services, posts, fmtDate };
