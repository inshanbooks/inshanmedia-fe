import { buildImageUrl } from '@/services/api'

function renderInline(children) {
  if (!children) return null
  return children.map((child, i) => {
    let text = child.text || ''

    if (child.bold) text = <strong key={i}>{text}</strong>
    if (child.italic) text = <em key={i}>{text}</em>
    if (child.underline) text = <u key={i}>{text}</u>
    if (child.strikethrough) text = <s key={i}>{text}</s>
    if (child.code) text = <code key={i} className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">{text}</code>

    if (child.type === 'link') {
      return (
        <a
          key={i}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary dark:text-primary-300 underline hover:no-underline"
        >
          {renderInline(child.children)}
        </a>
      )
    }

    return <span key={i}>{text}</span>
  })
}

function renderBlock(block, index) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {renderInline(block.children)}
        </p>
      )

    case 'heading': {
      const Tag = `h${block.level}`
      const classes = {
        1: 'text-3xl font-heading font-bold mt-8 mb-4',
        2: 'text-2xl font-heading font-bold mt-7 mb-3',
        3: 'text-xl font-heading font-semibold mt-6 mb-3',
        4: 'text-lg font-heading font-semibold mt-5 mb-2',
        5: 'text-base font-heading font-semibold mt-4 mb-2',
        6: 'text-sm font-heading font-semibold mt-4 mb-2',
      }
      return (
        <Tag key={index} className={classes[block.level] || ''}>
          {renderInline(block.children)}
        </Tag>
      )
    }

    case 'list': {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul'
      const listClass = block.format === 'ordered'
        ? 'list-decimal list-inside mb-4 space-y-1'
        : 'list-disc list-inside mb-4 space-y-1'
      return (
        <ListTag key={index} className={listClass}>
          {block.children?.map((item, i) => (
            <li key={i}>{renderInline(item.children)}</li>
          ))}
        </ListTag>
      )
    }

    case 'image': {
      const src = buildImageUrl(block.image?.url)
      return src ? (
        <figure key={index} className="my-6">
          <img
            src={src}
            alt={block.image?.alternativeText || ''}
            className="w-full rounded-lg"
          />
          {block.image?.caption && (
            <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      ) : null
    }

    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary pl-4 italic my-4 text-gray-600 dark:text-gray-300"
        >
          {renderInline(block.children)}
        </blockquote>
      )

    case 'code':
      return (
        <pre
          key={index}
          className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"
        >
          <code>{block.children?.[0]?.text}</code>
        </pre>
      )

    default:
      return null
  }
}

export default function BlockRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}
