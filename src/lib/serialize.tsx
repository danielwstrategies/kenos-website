import React, { Fragment } from 'react'

type Node = {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  children?: Node[]
  url?: string
  [key: string]: any
}

export function serialize(nodes: Node[]): React.ReactNode {
  if (!nodes) return null

  return nodes.map((node, i) => {
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text

      if (node.bold) {
        text = <strong key={i}>{text}</strong>
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>
      }

      if (node.underline) {
        text = <u key={i}>{text}</u>
      }

      if (node.strikethrough) {
        text = <s key={i}>{text}</s>
      }

      if (node.code) {
        text = <code key={i}>{text}</code>
      }

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node.type) return null

    const children = node.children ? serialize(node.children) : null

    switch (node.type) {
      case 'h1':
        return <h1 key={i}>{children}</h1>
      case 'h2':
        return <h2 key={i}>{children}</h2>
      case 'h3':
        return <h3 key={i}>{children}</h3>
      case 'h4':
        return <h4 key={i}>{children}</h4>
      case 'h5':
        return <h5 key={i}>{children}</h5>
      case 'h6':
        return <h6 key={i}>{children}</h6>
      case 'blockquote':
        return <blockquote key={i}>{children}</blockquote>
      case 'ul':
        return <ul key={i}>{children}</ul>
      case 'ol':
        return <ol key={i}>{children}</ol>
      case 'li':
        return <li key={i}>{children}</li>
      case 'link':
        return (
          <a href={node.url} key={i} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      default:
        return <p key={i}>{children}</p>
    }
  })
}
