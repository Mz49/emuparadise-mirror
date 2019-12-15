# EmuParadise Mirror
A Cloudflare Worker script that mirrors EmuParadise and alters download pages to include a working link.

## Setup
Cloudflare is required for this to function correctly. Choose an existing domain or add a new one. You can setup dummy records if needed, the Worker will handle all traffic anyways. Once you've added a domain, head to the Workers section, and select Launch Editor. Create a new script and paste the contents of [`worker.js`](worker.js) into it. **You'll have to change the `mirror_domain` to your own.** Duh. Save the script and return back to Dashboard. Select Add Route. In the Route field, fill in `*emuparadise.ga/*`. **Again, use your domain!** In the Worker dropdown, select the Worker you just created. Save and you're done!
