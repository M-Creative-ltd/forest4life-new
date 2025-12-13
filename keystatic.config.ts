import {config, collection, fields, singleton} from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});


export default config({
  storage: {
    kind: 'github',
    repo: 'M-Creative-ltd/forest4life-new',
  },

  collections:{
    //partners collection
    partners: collection({
      label: 'Partners & Donors',
      path: 'content/partners/*',
      slugField: 'name',
      schema: {
        name: fields.slug({name: {label: 'Display Name'}}),
        legal_name: fields.text({
          label: 'Legal / Registered Name',
          description: 'Optional full legal name'
        }),
        short_description: fields.text({
          label: 'Short description',
          description: 'One-line description of organization'
        }),
        role: fields.text({
          label: 'Role in partnership',
          description: 'e.g., Funding, Implementation, Technical Assistance'
        }),
        scope: fields.text({
          label: 'Scope of partnership',
          description: 'Geographic / thematic scope, e.g., Rwanda national rollout; WASH activities in Eastern province'
        }),
        website: fields.url({label: 'Partner Website link (optional)'}),
        twitter: fields.url({label: 'Partner Twitter profile (optional)'}),
        facebook: fields.url({label: 'Partner Facebook page (optional)'}),
        instagram: fields.url({label: 'Partner Instagram (optional)'}),
        linkedin: fields.url({label: 'Partner LinkedIn (optional)'}),
        logo: fields.image({
          label: 'Partner\'s Logo image',
          directory: 'public/images/partners',
          publicPath: '/images/partners/',
        }),
        cover_image: fields.image({
          label: 'Partner\'s Cover image (optional)',
          directory: 'public/images/partners',
          publicPath: '/images/partners/',
        }),
        country: fields.text({label: 'Partner\'s Country / Headquarter'}),
        address: fields.text({label: 'Partner\'s Address (optional)'}),
        is_active: fields.checkbox({
          label: 'Partner is active?',
          defaultValue: true
        }),
      }
    }),

    //Blogs collection
    blogs: collection({
      label: "Blogs",
      path:'content/blogs/*/',
      slugField: "title",
      schema: {
        title: fields.slug({name: {label: 'Title'}}),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short summary displayed in blog listings'
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'draft',
        }),
        date_created: fields.date({label:'Date created'}),
        date_updated: fields.date({label:'Date updated'}),
        published_at: fields.date({
          label:'Published date',
          description: 'When this article goes live on the site.',
        }),
        author: fields.relationship({label:'Author', collection:'authors'}),
        category: fields.text({label: 'Category'}),
        tags: fields.array(
          fields.text({label: 'Tag'}),
          {label: 'Tags', itemLabel: (item) => item.value || 'Tag'}
        ),
        featured_image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blogs',
          publicPath: '/images/blogs/'
        }),
        reading_time_minutes: fields.number({
          label: 'Reading Time (minutes)',
          description: 'Optional: estimated minutes to read, e.g. 5'
        }),
        content: fields.markdoc({
          label: 'Content',
          description: 'Write the full article with headings, bold/italic, bullet/numbered lists, quotes, images and links. Markdown/Markdoc supported.',
        }),
        meta_title: fields.text({
          label: 'Meta Title (SEO)',
          description: 'Shown in browser tab and search results. Keep under ~60 characters. Example: "How We Restore Rwanda\'s Forests".'
        }),
        meta_description: fields.text({
          label: 'Meta Description (SEO)',
          description: '1–2 sentence summary for search engines and social share cards. Example: "See how Forest4Life partners with communities to reforest degraded land."'
        }),
      },
    }),

    //Authors collection
    authors: collection({
      label: "Authors",
      path: 'content/authors/*/',
      slugField: 'full_name',
      schema: {
        full_name: fields.slug({
          name: {
            label: 'Full names',
            description: 'Write full names with space in between',
          }
        }),
        bio: fields.text({label:'Bio'}),
        avatar: fields.image({
          label:'Avatar',
          directory:'public/images/authors',
          publicPath:'/images/authors/'
        })
      }
    }),

    //Programs collection
    services: collection({
      label: 'Programs',
      path: 'content/services/*/',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: 'Title of this program or service' } }),
        short_description: fields.text({
          label: 'Short Description for cards and listings',
          description:'A brief overview of what this program is about (1–2 sentences) for cards and listings.',
        }),
        description: fields.markdoc({
          label: 'Full Description',
          description:
              'Detailed information about the program — purpose, benefits, process. Supports headings, bold/italic, bullet/numbered lists, quotes, images and links.',
        }),
        cover_image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/services',
          publicPath: '/images/services/',
        }),
        icon: fields.image({
          label: 'Icon Image',
          description: 'Small icon image for cards and displays (optional). Use PNG with transparent background.',
          directory: 'public/images/icons',
          publicPath: '/images/icons/',
        }),
        beneficiaries: fields.text({
          label: 'Beneficiaries',
          description: 'Who benefits from this program? e.g., "Smallholder farmers in Eastern Province", "Youth aged 15-25"'
        }),
        goals: fields.markdoc({
          label: 'Program Goals',
          description: 'List specific goals or objectives. Use bullet points or numbered lists.',
        }),
        gallery: fields.array(
            fields.object({
              image: fields.image({
                label: 'Gallery Image',
                directory: 'public/images/services',
                publicPath: '/images/services/',
              }),
              caption: fields.text({label: "Caption"}),
            }),
            {
              label: 'Gallery',
              itemLabel: (item) => item.fields.caption?.value || "No caption",
            }
        ),
        
        
        date_created: fields.date({ label: 'Date Created' }),
        date_updated: fields.date({ label: 'Last Updated' }),
      },
    }),

    //Projects Collection
    projects: collection({
      label: 'Projects',
      path: 'content/projects/*',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({
          label: 'Summary',
          description: '1–3 sentences for cards and lists. Keep it short and clear.',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Planned', value: 'planned' },
            { label: 'Ongoing', value: 'ongoing' },
            { label: 'Completed', value: 'completed' },
            { label: 'Draft', value: 'draft' },
            { label: 'Archived', value: 'archived' },
            { label: 'On hold', value: 'on_hold' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
          defaultValue: 'draft',
        }),
        featured: fields.checkbox({
          label: 'Featured Project?',
          description: 'Display on homepage',
          defaultValue: false
        }),
        location: fields.text({
          label: 'Location',
          description: 'Primary location (e.g., "Bugesera District, Eastern Province")'
        }),
        country: fields.text({ label: 'Country', description: 'Optional', defaultValue: 'Rwanda' }),
        region: fields.text({ label: 'Region (optional)' }),
        district: fields.text({ label: 'District (optional)' }),
        start_date: fields.date({ label: 'Start date', description: 'When work started' }),
        end_date: fields.date({ label: 'End date (optional)' }),
        executive_summary: fields.text({
          label: 'Executive Summary',
          description: 'Short overview shown near the top of the page.',
        }),
        background: fields.markdoc({
          label: 'Background',
          description: 'Use headings, bold/italic, bullet/numbered lists, quotes, images and links.',
        }),
        objectives: fields.markdoc({
          label: 'Objectives',
          description: 'List project objectives with rich text (headings, lists, bold, links).',
        }),
        methodology: fields.markdoc({
          label: 'Methodology',
          description: 'Describe approach with Markdoc/Markdown (headings, lists, quotes, images, links).',
        }),
        key_findings: fields.markdoc({ 
          label: 'Key Findings',
          description: 'Optional. Use lists, headings, callouts for findings.',
        }),
        conclusions: fields.markdoc({ 
          label: 'Conclusions',
          description: 'Optional. Summaries or lessons learned with rich text.',
        }),
        recommendations: fields.markdoc({ 
          label: 'Recommendations',
          description: 'Optional. Action items with headings and lists.',
        }),
        impact_metrics: fields.array(
          fields.object({
            label: fields.text({
              label: 'Metric Label',
              description: 'Name of the impact metric (e.g., "Trees Planted", "Hectares Restored", "Farmers Trained")'
            }),
            value: fields.number({
              label: 'Metric Value',
              description: 'Numeric value for this metric'
            }),
          }),
          {
            label: 'Impact Metrics',
            description: 'Add custom impact metrics for this project. Each metric has a label and numeric value.',
            itemLabel: (item) => `${item.fields.label?.value || 'Metric'}: ${item.fields.value?.value ?? ''}`
          }
        ),
        linked_partners: fields.array(
            fields.object({
              partner: fields.relationship({
                label: 'Partner',
                collection: 'partners',
              }),
              role: fields.text({ label: 'Role in Partnership' }),
            }),
            {
              label: 'Partners',
              itemLabel: (it) => it.fields.partner?.value || 'Partner'
            }
        ),
        contact_person: fields.relationship({
          label: 'Contact person',
          collection: 'authors',
        }),
        activities: fields.array(
          fields.object({
            date: fields.date({ label: 'Date' }),
            title: fields.text({ label: 'Activity Title' }),
            description: fields.text({ label: 'Description' }),
            status: fields.select({
              label: 'Status',
              options: [
                { label: 'Planned', value: 'planned' },
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Completed', value: 'completed' },
              ],
              defaultValue: 'planned',
            }),
          }),
          {
            label: 'Activities',
            itemLabel: (it) => it.fields.title?.value || 'Activity'
          }
        ),
        timeline: fields.array(
          fields.object({
            from_date: fields.date({ label: 'From Date' }),
            to_date: fields.date({ label: 'To Date (optional)' }),
            label: fields.text({ label: 'Phase Label' }),
            description: fields.text({ label: 'Description' }),
          }),
          {
            label: 'Timeline Phases',
            itemLabel: (it) => it.fields.label?.value || 'Phase'
          }
        ),
                
        hero_image: fields.image({
          label: 'Hero image',
          directory: 'public/images/projects', 
          publicPath: '/images/projects/'
        }),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'public/images/projects',
              publicPath: '/images/projects/'
            }),
            caption: fields.text({ label: 'Caption' }),
            alt_text: fields.text({ label: 'Alt Text' }),
          }),
          {
            label: 'Gallery',
            itemLabel: (it) => it.fields.caption?.value || 'Image'
          }
        ),
        documents: fields.array(
            fields.object({
              name: fields.text({ label: 'Document Name' }),
              file: fields.file({
                label: 'Upload File (PDF, Word, etc.)',
                directory: 'public/docs/projects',
                publicPath: '/docs/projects/',
              }),
              url: fields.url({ label: 'Or Link to File (optional)' }),
              type: fields.text({ label: 'File Type (e.g., PDF)', description: 'Optional' }),
              size: fields.number({ label: 'File Size (bytes)', description: 'Optional' }),
            }),
            {
              label: 'Documents',
              description: 'Upload a file or paste a link. Use name to describe it.',
              itemLabel: (it) => it.fields.name?.value || (it.fields.file ? 'Uploaded file' : 'Document')
            }
        ),
      },
    }),

  },

  singletons:{
    settings: singleton({
      label: 'Website Settings',
      path: 'content/settings/',
      schema: {
        siteName: fields.text({
          label: 'Website Name',
          description: 'Your brand or company name that appears in the header and browser tab.',
        }),
        logo: fields.image({
          label: 'Logo Image',
          description: 'Main logo for your website (used in header, footer, and favicon).',
          directory: 'public/images/settings',
          publicPath: '/images/settings/',
        }),
        favicon: fields.image({
          label: 'Favicon',
          description: 'Small icon shown in browser tabs.',
          directory: 'public/images/settings',
          publicPath: '/images/settings/',
        }),
        footer: fields.object({
          organizationName: fields.text({
            label: 'Organization Name',
            description: 'Name displayed in footer'
          }),
          description: fields.text({
            label: 'Organization Description',
            description: '1–2 sentences about the organization'
          }),
          tags: fields.array(
            fields.text({ label: 'Tag' }),
            {
              label: 'Footer Tags',
              description: 'Tags/chips displayed in footer (e.g., Reforestation, Community Training)',
              itemLabel: (it) => it.value || 'Tag'
            }
          ),
          contact: fields.object({
            address: fields.text({ label: 'Address', description: 'Optional' }),
            phone: fields.text({ label: 'Phone Number', description: 'Optional' }),
            email: fields.text({ label: 'Email Address', description: 'Optional' }),
            whatsapp: fields.text({ 
              label: 'WhatsApp Number', 
              description: 'Optional. Enter in international format, e.g., +250788123456' 
            }),
          }),
          socialLinks: fields.array(
            fields.object({
              platform: fields.select({
                label: 'Social Platform',
                options: [
                  { label: 'Facebook', value: 'facebook' },
                  { label: 'Twitter', value: 'twitter' },
                  { label: 'LinkedIn', value: 'linkedin' },
                  { label: 'Instagram', value: 'instagram' },
                  { label: 'Telegram', value: 'telegram' },
                  { label: 'TikTok', value: 'tiktok' },
                ],
                defaultValue: 'facebook',
              }),
              url: fields.url({ label: 'Social Media URL' }),
            }),
            {
              label: 'Social Media Links',
              itemLabel: (it) => it.fields.platform?.value || 'Social Link'
            }
          ),
          copyright: fields.text({
            label: 'Copyright Text',
            description: 'e.g., © 2025 Forest4Life. All rights reserved.'
          }),
          tagline: fields.text({
            label: 'Footer Tagline',
            description: 'e.g., Restoring Rwanda\'s Forests, Empowering Communities for a sustainable future'
          }),
        }),
        seo: fields.object({
          metaTitle: fields.text({
            label: 'Meta Title',
            description: 'Appears in browser tab and search results. Keep under ~60 chars. Example: "Forest4Life | Restoring Rwanda\'s Forests".',
          }),
          metaDescription: fields.text({
            label: 'Meta Description',
            description: 'Short summary for search and social sharing. Example: "We restore forests and empower communities across Rwanda."',
          }),
          keywords: fields.text({
            label: 'SEO Keywords',
            description: 'Comma-separated keywords (optional). Example: forest restoration, Rwanda, community.',
          }),
          ogImage: fields.image({
            label: 'Open Graph Image (Social Share Image)',
            directory: 'public/images/seo',
            publicPath: '/images/seo/',
          }),
        }),
      },
    }),

    home: singleton({
      label: 'Homepage Content',
      path: 'content/home/',
      schema: {
        hero: fields.object({
          title: fields.text({ label: 'Main Title' }),
          highlightedPhrase: fields.text({
            label: 'Highlighted Phrase',
            description: 'Part of title that should be highlighted (e.g., "One Tree at a Time")'
          }),
          subtitle: fields.text({ label: 'Subtitle' }),
          backgroundImage: fields.image({
            label: 'Background Image',
            directory: 'public/images/home',
            publicPath: '/images/home/'
          }),
          primaryCTA: fields.object({
            text: fields.text({ label: 'Primary CTA Text' }),
            href: fields.text({ label: 'Primary CTA Link' }),
          }),
          secondaryCTA: fields.object({
            text: fields.text({ label: 'Secondary CTA Text' }),
            href: fields.text({ label: 'Secondary CTA Link' }),
          }),
          stats: fields.array(
            fields.object({
              value: fields.text({ label: 'Stat Value (e.g., 1,000+)' }),
              label: fields.text({ label: 'Stat Label (e.g., Hectares Restored)' }),
            }),
            {
              label: 'Hero Stats',
              itemLabel: (it) => `${it.fields.value?.value || ''} ${it.fields.label?.value || ''}`
            }
          ),
        }),
        whoWeAre: fields.object({
          title: fields.text({ label: 'Section Title' }),
          paragraphs: fields.array(
            fields.text({ label: 'Paragraph' }),
            {
              label: 'Content Paragraphs',
              itemLabel: (it) => it.value?.substring(0, 50) || 'Paragraph'
            }
          ),
          keyValues: fields.array(
            fields.object({
              icon: fields.text({
                label: 'Icon',
                description: 'Enter a Lucide icon name (e.g., "Leaf", "Target", "Users") or upload an image path. Icon names are case-sensitive.',
              }),
              title: fields.text({ label: 'Value Title' }),
              description: fields.text({ label: 'Value Description' }),
            }),
            {
              label: 'Key Values',
              itemLabel: (it) => it.fields.title?.value || 'Value'
            }
          ),
          mission: fields.object({
            title: fields.text({ label: 'Mission Card Title' }),
            description: fields.text({ label: 'Mission Description' }),
            foundedYear: fields.text({ label: 'Founded Year' }),
          }),
        }),
        projectsIntro: fields.object({
          title: fields.text({ label: 'Section Title' }),
          intro: fields.text({ label: 'Intro Text' }),
          featured_projects: fields.array(
            fields.relationship({
              label: 'Featured Project',
              collection: 'projects',
            }),
            {
              label: 'Featured Projects',
              description: 'Select up to 3 projects to showcase on the homepage',
              itemLabel: (item) => item.value || 'Project'
            }
          ),
        }),
        servicesIntro: fields.object({
          title: fields.text({ label: 'Section Title' }),
          intro: fields.text({ label: 'Intro Text' }),
          featured_services: fields.array(
            fields.relationship({
              label: 'Featured Program',
              collection: 'services',
            }),
            {
              label: 'Featured Programs',
              description: 'Select up to 3 programs to showcase on the homepage',
              itemLabel: (item) => item.value || 'Program'
            }
          ),
          ctaPanel: fields.object({
            heading: fields.text({ label: 'CTA Heading' }),
            body: fields.text({ label: 'CTA Body Text' }),
            primaryCTA: fields.object({
              text: fields.text({ label: 'Primary CTA Text' }),
              href: fields.text({ label: 'Primary CTA Link' }),
            }),
            secondaryCTA: fields.object({
              text: fields.text({ label: 'Secondary CTA Text' }),
              href: fields.text({ label: 'Secondary CTA Link' }),
            }),
          }),
        }),
      },
    }),

    about: singleton({
      label: 'About Page Content',
      path: 'content/about/',
      schema: {
        hero: fields.object({
          title: fields.text({ label: 'Page Title' }),
          subtitle: fields.text({ label: 'Subtitle' }),
        }),
        story: fields.object({
          paragraphs: fields.array(
            fields.text({ label: 'Paragraph' }),
            {
              label: 'Story Paragraphs',
              itemLabel: (it) => it.value?.substring(0, 50) || 'Paragraph'
            }
          ),
          image: fields.image({
            label: 'Story Image',
            directory: 'public/images/about',
            publicPath: '/images/about/'
          }),
        }),
        values: fields.object({
          title: fields.text({ label: 'Section Title' }),
          intro: fields.text({ label: 'Intro Text' }),
          values: fields.array(
            fields.object({
              icon: fields.text({
                label: 'Icon',
                description: 'Enter a Lucide icon name (e.g., "Leaf", "Target", "Users") or upload an image path. Icon names are case-sensitive.',
              }),
              title: fields.text({ label: 'Value Title' }),
              description: fields.text({ label: 'Value Description' }),
            }),
            {
              label: 'Values',
              itemLabel: (it) => it.fields.title?.value || 'Value'
            }
          ),
        }),
        team: fields.object({
          title: fields.text({ label: 'Section Title' }),
          intro: fields.text({ label: 'Intro Text' }),
          members: fields.array(
            fields.object({
              name: fields.text({ label: 'Member Name' }),
              role: fields.text({ label: 'Role' }),
              bio: fields.text({ label: 'Bio' }),
              avatar: fields.image({
                label: 'Avatar',
                directory: 'public/images/team',
                publicPath: '/images/team/'
              }),
            }),
            {
              label: 'Team Members',
              itemLabel: (it) => it.fields.name?.value || 'Team Member'
            }
          ),
        }),
        impactMetrics: fields.object({
          title: fields.text({ label: 'Section Title' }),
          intro: fields.text({ label: 'Intro Text' }),
          metrics: fields.array(
            fields.object({
              icon: fields.text({
                label: 'Icon',
                description: 'Enter a Lucide icon name (e.g., "Leaf", "Target", "Users") or upload an image path. Icon names are case-sensitive.',
              }),
              value: fields.text({ label: 'Metric Value' }),
              label: fields.text({ label: 'Metric Label' }),
              description: fields.text({ label: 'Description' }),
            }),
            {
              label: 'Impact Metrics',
              itemLabel: (it) => `${it.fields.value?.value || ''} ${it.fields.label?.value || ''}`
            }
          ),
        }),
        partners: fields.object({
          title: fields.text({ label: 'Section Title' }),
          intro: fields.text({ label: 'Intro Text' }),
          partnerList: fields.array(
            fields.relationship({
              label: 'Partner',
              collection: 'partners',
            }),
            {
              label: 'Partners',
              description: 'Select partners to display in the About section. All partners from the Partners collection are available.',
              itemLabel: (item) => item.value || 'Partner'
            }
          ),
        }),
        annual_reports: fields.array(
          fields.object({
            year: fields.text({ label: 'Year' }),
            file: fields.file({
              label: 'Report File (PDF)',
              directory: 'public/docs/reports',
              publicPath: '/docs/reports/',
            }),
            summary: fields.text({ 
              label: 'Summary',
              description: 'Brief description of the annual report'
            }),
          }),
          {
            label: 'Annual Reports',
            description: 'Upload annual reports for transparency',
            itemLabel: (it) => `${it.fields.year?.value || 'Report'} Annual Report`
          }
        ),
        finalCTA: fields.object({
          heading: fields.text({ label: 'CTA Heading' }),
          body: fields.text({ label: 'CTA Body Text' }),
        }),
      },
    }),

  }

});
