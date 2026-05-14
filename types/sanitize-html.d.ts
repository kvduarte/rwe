declare module "sanitize-html" {
  export interface IOptions {
    allowedTags?: string[]
    allowedAttributes?: { [key: string]: string[] }
    allowedSchemes?: string[]
    allowedSchemesByTag?: { [key: string]: string[] }
    selfClosing?: string[]
    enforceHtmlBoundary?: boolean
    [key: string]: unknown
  }

  export default function sanitizeHtml(
    html: string,
    options?: IOptions
  ): string
}
