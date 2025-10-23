# Ghost Content Seeder

A comprehensive content generation script for Ghost CMS using Faker.js. Perfect for testing your N-tier architecture with realistic, varied content.

## What It Generates

- **Authors**: 8 realistic authors with bios, locations, and websites
- **Tags**: 25 diverse tags across different categories
- **Posts**: 100 blog posts with rich content, multiple tags, and various authors
- **Pages**: 10 static pages for testing different content types

## Features

- **Realistic Content**: Uses Faker.js to generate believable content
- **Performance Tracking**: Measures creation time and batch processing
- **Error Handling**: Robust error handling with detailed logging
- **Batch Processing**: Processes content in batches to avoid overwhelming the API
- **Configurable**: Easy to adjust content volume and types

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Ghost Connection**:
   Set environment variables or edit the script:
   ```bash
   export GHOST_URL="http://localhost:2368"
   export GHOST_ADMIN_API_KEY="your-admin-api-key"
   ```

3. **Get Your Admin API Key**:
   - Go to your Ghost admin panel
   - Navigate to Settings → Integrations
   - Create a new custom integration
   - Copy the Admin API key

## Usage

### Basic Usage
```bash
npm run seed
```

### Custom Content Volume
```bash
# Small test dataset
npm run seed:small

# Large test dataset
npm run seed:large

# Custom configuration
NUM_AUTHORS=5 NUM_TAGS=15 NUM_POSTS=50 NUM_PAGES=5 npm run seed
```

### Direct Execution
```bash
node ghost-content-seeder.js
```

## Configuration Options

You can customize the content generation by setting environment variables:

- `NUM_AUTHORS`: Number of authors to create (default: 8)
- `NUM_TAGS`: Number of tags to create (default: 25)
- `NUM_POSTS`: Number of posts to create (default: 100)
- `NUM_PAGES`: Number of pages to create (default: 10)
- `GHOST_URL`: Your Ghost instance URL (default: http://localhost:2368)
- `GHOST_ADMIN_API_KEY`: Your Ghost Admin API key

## Content Types Generated

### Authors
- Realistic names and email addresses
- Bio information
- Location and website
- Unique slugs

### Tags
- Diverse categories (commerce, science, animals, colors, music, sports, etc.)
- Descriptive text
- Public visibility

### Posts
- Varied titles and content
- Rich HTML with paragraphs, headers, and lists
- Multiple tags per post
- Different authors
- Mix of published, draft, and scheduled posts
- SEO metadata (meta title, description, excerpt)
- Featured post flags

### Pages
- Static page content
- Similar structure to posts but marked as pages
- Various authors

## Performance Features

- **Batch Processing**: Processes content in batches of 5 to avoid API overload
- **Rate Limiting**: 1-second delay between batches
- **Progress Tracking**: Real-time logging of creation progress
- **Performance Metrics**: Tracks total time and average time per item
- **Error Recovery**: Continues processing even if individual items fail

## Perfect for Your N-Tier Experiment

This seeder is ideal for testing your N-tier architecture because:

1. **Realistic Load**: Generates content that mimics real-world usage
2. **Performance Testing**: Measures creation time to test your infrastructure
3. **Varied Content**: Tests different content types and relationships
4. **Repeatable**: Easy to reset and re-seed for different phases
5. **Scalable**: Can generate small or large datasets as needed

## Next Steps

1. Set up your Ghost instance in your N-tier architecture
2. Run this seeder to populate it with test content
3. Measure performance metrics (creation time, database load, etc.)
4. Use the generated content to test your reverse proxy and database performance
5. Repeat for different phases of your experiment

## Troubleshooting

- **API Key Issues**: Make sure your Admin API key is correct and has proper permissions
- **Connection Issues**: Verify your Ghost URL is accessible
- **Rate Limiting**: If you get rate limited, increase the `DELAY_BETWEEN_BATCHES` value
- **Memory Issues**: For very large datasets, consider reducing `BATCH_SIZE`

## License

MIT License - Feel free to modify and use for your experiments!
