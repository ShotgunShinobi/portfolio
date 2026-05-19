# How to Deploy Your Portfolio with a Custom Domain

Having a custom domain (like `mariangeorge.com` or `marian.ai`) instantly makes your portfolio look incredibly professional. 

Because you want to connect a custom domain, I highly recommend using **Vercel** to host the site, because Vercel handles all the complicated security certificates (HTTPS) for you automatically and for free.

Here is the exact step-by-step process for someone doing this for the first time:

### Step 1: Buy Your Domain
You need to buy your domain name from a "Domain Registrar". **Namecheap** or **Porkbun** are the two best options because they are very beginner-friendly and inexpensive (usually $10-$15 a year).
1. Go to [Namecheap.com](https://www.namecheap.com/) (or Porkbun).
2. Type in your desired name in the search bar (e.g., `mariangeorge.com`, `mariangeorge.dev`, or `mariangeorge.ai`) and hit search.
3. If it's available, add it to your cart and complete the checkout process to create your account. 

### Step 2: Put Your Site on Vercel
Before you can connect the domain, your site needs to be hosted.
1. Upload this project folder to a repository on your GitHub account.
2. Log into [Vercel.com](https://vercel.com/) using your GitHub account.
3. Click **"Add New..."** > **"Project"**, select your GitHub repository, and click **"Deploy"**.
4. In less than a minute, Vercel will give you a live working website (it will have an ugly URL at first, which we are about to fix).

### Step 3: Connect Your Domain to Vercel
Now we just need to tell Vercel and Namecheap to talk to each other.
1. On your Vercel dashboard, click on your newly deployed project.
2. Click on the **"Settings"** tab at the top, then click **"Domains"** on the left side menu.
3. Type the custom domain you just bought (e.g., `mariangeorge.dev`) into the box and click **"Add"**.
4. Vercel will now show you an error saying "Invalid Configuration". **Don't panic!** Below the error, Vercel will give you a specific string of numbers called an **A Record** (it looks like an IP address: `76.76.21.21`) or **Nameservers**. Copy this.

### Step 4: Tell Your Domain Where Your Site Is
1. Go back to your Namecheap dashboard where you bought the domain.
2. Find your domain in the list and click the **"Manage"** button next to it.
3. Go to the **"Advanced DNS"** tab.
4. Look for the "Host Records" section. You are going to add a new record based on what Vercel gave you:
   * **Type**: `A Record`
   * **Host**: `@`
   * **Value**: Paste the IP Address you copied from Vercel (`76.76.21.21`).
5. Save the changes (usually a small green checkmark).

### Step 5: Wait for the Magic
You are done! DNS (the phonebook of the internet) takes a little bit of time to update globally. Usually, it takes around 15 to 30 minutes. 

Keep an eye on your Vercel Dashboard. Once the error disappears and turns into a green checkmark, you can type your custom domain into your browser, and your beautiful ML portfolio will be live!
