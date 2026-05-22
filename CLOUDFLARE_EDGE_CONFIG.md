# Deployment & Edge Configuration

To ensure maximum SEO performance and robust security, it is critical that our production deployment operates strictly over HTTPS with proper edge-level redirects.

## Cloudflare Dashboard Verification

Before considering any deployment fully complete, please verify the following settings in the Cloudflare dashboard for `thecalcpro.com`:

1. **Always Use HTTPS**: Must be **ENABLED**.
   * *Location*: SSL/TLS > Edge Certificates
   * *Purpose*: Enforces a 301 permanent redirect for all HTTP requests to HTTPS at the edge layer, protecting users from man-in-the-middle attacks and avoiding split SEO metrics.

2. **Automatic HTTPS Rewrites**: Must be **ENABLED**.
   * *Location*: SSL/TLS > Edge Certificates
   * *Purpose*: Automatically rewrites any mixed-content `http://` links (such as images, scripts, or hardcoded references) to `https://`, preventing browser "Not Secure" warnings.

All static output and generated assets, including sitemap mappings and programmatic routes, strictly compile to `https://thecalcpro.com`. Enabling these Edge-level features acts as our primary defense to ensure compliance with our zero HTTP policy.
