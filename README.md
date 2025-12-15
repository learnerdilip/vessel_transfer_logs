
### What you built and why you prioritized those features
(I chose to go with the following)
- Data Display & Entry 
  - Transfer list - View all transfers with key info (time, location, duration, score)
  - Transfer details - See full details of a single transfer
  - Vessel info - Show which vessel performed the transfer (requires joining data)
  - Edit transfer - Update passenger counts (paxUp/paxDown), cargo counts, and comments

- Filtering & Sorting
  - Filter by vessel - When multiple vessels are operating

- Analytics
  - Score visualization - Color-code transfer quality (green = smooth, red = rough)
  
- Visualization
  - Highlight rough conditions - Visually flag transfers with high wave height

#### Why I went with this list of features? 
- Since the client is looking for a way to have a quick look at the transfers for various vessels and the conditions on a day. A table gives them a quick view (Drawer rather than seperate page) and they can quickly check what the associated data is for a particular transfer
- I think these set of features form a part of what a user would use together. Other features could be clubbed with these but they would take significantly more time, so i chose to skip them for this. like showing coordinates on a map
- The user is able to edit the comment but not other data, the assumption is that other data is more read only and input through other sources
- Some important things are color coded like the overall score, which can immediately indicate the problematic transfers

### What you'd build next with more time
- would use axios for making requests as it provides many features
- The request now gets all the data, mostly because the data is less and frontend can handle such amount of data with ease. I would choose to filter things on the backend in an actual setup
- I have skipped some of DRY priciples in favor of using time for features and error free experience (like making more components, making common components in one place)
- The user feedback could be better with toasts or other elements
- could have included features related to navigation and plotting coordinates which would be nice to visualize
- make other fields in the transfer editable if the demand is such(right now only comment is editable)

### Any trade-offs or decisions worth mentioning
- Using Docker to make it easier to run on any machine with docker installed. Docker-compose allows to run multiple services without needing to setup project everytime. Dependencies are also contained alsong with versions of various depdendencies
- using Json-server (as recommended) as a seperate service which allows for many REST API like features out of the box
- Using tailwind to help speed up the process of styling the UI components
- Chose to make it single page application, to make the user see all in one place. I would assume that its easier to go through the list on one page rather than going back and forth pages
- I would also also use `.env` for endpoint for the server and other changable elements/ variables


## How to Run

Prerequisites: Docker & Docker Compose installed.

1. Clone the repository: `git clone git@github.com:learnerdilip/vessel_transfer_logs.git`
2. Start the stack: `docker-compose up --build`
3. Website is available on: `http://localhost:5173`