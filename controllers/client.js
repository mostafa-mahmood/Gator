//https://www.wired.com/feed/rss

export async function getXML(link) {
          try {
              const controller = new AbortController();
              const timeout = setTimeout(() => controller.abort(), 5000);
      
              const res = await fetch(link, { signal: controller.signal });
              clearTimeout(timeout);
      
              if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      
              return await res.text();
          } catch (err) {
              return null;
          }
}


