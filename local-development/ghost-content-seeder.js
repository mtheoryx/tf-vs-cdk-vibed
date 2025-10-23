#!/usr/bin/env node

/**
 * Ghost Content Seeder
 * 
 * Mass generates realistic content for Ghost CMS using Faker.js
 * Perfect for testing N-tier architecture performance
 * 
 * Usage: node ghost-content-seeder.js
 */

const { faker } = require('@faker-js/faker');
const axios = require('axios');

// Configuration
const CONFIG = {
  GHOST_URL: process.env.GHOST_URL || 'http://localhost:2368',
  ADMIN_API_KEY: process.env.GHOST_ADMIN_API_KEY || 'YOUR_ADMIN_API_KEY',
  API_VERSION: 'v5.0',
  
  // Content generation settings
  NUM_AUTHORS: 8,
  NUM_TAGS: 25,
  NUM_POSTS: 100,
  NUM_PAGES: 10,
  
  // Performance tracking
  BATCH_SIZE: 5,
  DELAY_BETWEEN_BATCHES: 1000 // 1 second
};

// Initialize Ghost Admin API client
const ghostAPI = axios.create({
  baseURL: `${CONFIG.GHOST_URL}/ghost/api/admin`,
  headers: {
    'Authorization': `Ghost ${CONFIG.ADMIN_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const log = (message, data = null) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (data) console.log(JSON.stringify(data, null, 2));
};

// Content generation functions
const generateAuthor = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  slug: faker.helpers.slugify(faker.person.fullName()).toLowerCase(),
  bio: faker.person.bio(),
  location: faker.location.city(),
  website: faker.internet.url(),
  status: 'active'
});

const generateTag = () => ({
  name: faker.helpers.arrayElement([
    faker.commerce.department(),
    faker.science.chemicalElement().name,
    faker.animal.type(),
    faker.color.human(),
    faker.music.genre(),
    faker.sport.sport(),
    faker.vehicle.type(),
    faker.food.dish(),
    faker.technology.operatingSystem(),
    faker.company.buzzNoun()
  ]),
  slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
  description: faker.lorem.sentence(),
  visibility: 'public'
});

const generatePost = (authorId, tagIds) => ({
  title: faker.lorem.sentence(),
  slug: faker.helpers.slugify(faker.lorem.sentence()).toLowerCase(),
  html: generateRichContent(),
  status: faker.helpers.arrayElement(['published', 'draft', 'scheduled']),
  authors: [{ id: authorId }],
  tags: tagIds.map(id => ({ id })),
  excerpt: faker.lorem.paragraph(),
  meta_title: faker.lorem.sentence(),
  meta_description: faker.lorem.sentence(),
  featured: faker.datatype.boolean(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString()
});

const generatePage = (authorId) => ({
  title: faker.lorem.sentence(),
  slug: faker.helpers.slugify(faker.lorem.sentence()).toLowerCase(),
  html: generateRichContent(),
  status: 'published',
  authors: [{ id: authorId }],
  excerpt: faker.lorem.paragraph(),
  meta_title: faker.lorem.sentence(),
  meta_description: faker.lorem.sentence(),
  featured: false,
  page: true
});

const generateRichContent = () => {
  const paragraphs = faker.number.int({ min: 2, max: 8 });
  let html = '';
  
  for (let i = 0; i < paragraphs; i++) {
    html += `<p>${faker.lorem.paragraph()}</p>`;
  }
  
  // Add some variety with headers, lists, etc.
  if (faker.datatype.boolean()) {
    html += `<h2>${faker.lorem.sentence()}</h2>`;
    html += `<p>${faker.lorem.paragraph()}</p>`;
  }
  
  if (faker.datatype.boolean()) {
    html += `<ul>`;
    for (let i = 0; i < faker.number.int({ min: 3, max: 7 }); i++) {
      html += `<li>${faker.lorem.sentence()}</li>`;
    }
    html += `</ul>`;
  }
  
  return html;
};

// API interaction functions
const createAuthor = async (authorData) => {
  try {
    const response = await ghostAPI.post('/users/', { users: [authorData] });
    return response.data.users[0];
  } catch (error) {
    log('Error creating author:', error.response?.data || error.message);
    return null;
  }
};

const createTag = async (tagData) => {
  try {
    const response = await ghostAPI.post('/tags/', { tags: [tagData] });
    return response.data.tags[0];
  } catch (error) {
    log('Error creating tag:', error.response?.data || error.message);
    return null;
  }
};

const createPost = async (postData) => {
  try {
    const response = await ghostAPI.post('/posts/', { posts: [postData] });
    return response.data.posts[0];
  } catch (error) {
    log('Error creating post:', error.response?.data || error.message);
    return null;
  }
};

const createPage = async (pageData) => {
  try {
    const response = await ghostAPI.post('/pages/', { pages: [pageData] });
    return response.data.pages[0];
  } catch (error) {
    log('Error creating page:', error.response?.data || error.message);
    return null;
  }
};

// Batch processing functions
const processBatch = async (items, processor, batchName) => {
  const results = [];
  for (let i = 0; i < items.length; i += CONFIG.BATCH_SIZE) {
    const batch = items.slice(i, i + CONFIG.BATCH_SIZE);
    log(`Processing ${batchName} batch ${Math.floor(i / CONFIG.BATCH_SIZE) + 1}`);
    
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    
    results.push(...batchResults.filter(result => result !== null));
    
    if (i + CONFIG.BATCH_SIZE < items.length) {
      await delay(CONFIG.DELAY_BETWEEN_BATCHES);
    }
  }
  return results;
};

// Main seeding function
const seedGhostContent = async () => {
  const startTime = Date.now();
  log('🚀 Starting Ghost content seeding...');
  log(`Configuration: ${CONFIG.NUM_AUTHORS} authors, ${CONFIG.NUM_TAGS} tags, ${CONFIG.NUM_POSTS} posts, ${CONFIG.NUM_PAGES} pages`);
  
  try {
    // Step 1: Create authors
    log('📝 Creating authors...');
    const authorData = Array.from({ length: CONFIG.NUM_AUTHORS }, generateAuthor);
    const authors = await processBatch(authorData, createAuthor, 'authors');
    log(`✅ Created ${authors.length} authors`);
    
    // Step 2: Create tags
    log('🏷️ Creating tags...');
    const tagData = Array.from({ length: CONFIG.NUM_TAGS }, generateTag);
    const tags = await processBatch(tagData, createTag, 'tags');
    log(`✅ Created ${tags.length} tags`);
    
    // Step 3: Create posts
    log('📄 Creating posts...');
    const postData = Array.from({ length: CONFIG.NUM_POSTS }, () => {
      const authorId = faker.helpers.arrayElement(authors).id;
      const tagIds = faker.helpers.arrayElements(tags, { min: 1, max: 4 }).map(tag => tag.id);
      return generatePost(authorId, tagIds);
    });
    const posts = await processBatch(postData, createPost, 'posts');
    log(`✅ Created ${posts.length} posts`);
    
    // Step 4: Create pages
    log('📋 Creating pages...');
    const pageData = Array.from({ length: CONFIG.NUM_PAGES }, () => {
      const authorId = faker.helpers.arrayElement(authors).id;
      return generatePage(authorId);
    });
    const pages = await processBatch(pageData, createPage, 'pages');
    log(`✅ Created ${pages.length} pages`);
    
    // Summary
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    log('🎉 Seeding completed successfully!');
    log(`📊 Summary:`);
    log(`   - Authors: ${authors.length}`);
    log(`   - Tags: ${tags.length}`);
    log(`   - Posts: ${posts.length}`);
    log(`   - Pages: ${pages.length}`);
    log(`   - Total time: ${duration.toFixed(2)} seconds`);
    log(`   - Average time per item: ${(duration / (authors.length + tags.length + posts.length + pages.length)).toFixed(3)} seconds`);
    
  } catch (error) {
    log('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

// Run the seeder
if (require.main === module) {
  seedGhostContent();
}

module.exports = { seedGhostContent, generateAuthor, generateTag, generatePost, generatePage };
