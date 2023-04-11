# TypeScript Conversion Journal

## 1. Setting up the config
 Config and install went smoothly. I Followed the 'transitioning a project' docs from the TS site. I used the initial config settings from the tutorial, and then added fields from my previous TS project, most importantly: strict mode. I installed types for all the big dependencies, some libraries such as axios now come with types built in, so installing the @types seperately appears to be unnecessary.

 ## 2. Converting JoblyAPI
 So far this has been the most challenging. The app is not currently operational which makes it more difficult to debug in the browser. Instead, I'm retracing my steps, and manually confirming what type & shape a value ought to be. I've left some values as type "any" for now. The primary hurdles have been:

 - JWT's: The token is a string, unless you decode it, or if it hasn't been set. Then it's null. Worse still, 'token' is used throughout the app to refer to the JWT in it's various states: Jwt, string, and null.

 - Errors: I'm storing error messages in state to display as text, but the value caught in a catch block is unknown. Unsure of the best approach. The errors I'm catching on purpose are JSON accompanied by a 404 error code, sent by the backend. Catch block catches anything thrown so the type, must be unknown... do I assign a type after catching?

 ## 3.  Writing Interfaces
 This has been the easiest for me to implement, although I expect to rewrite interfaces like IUser once the app is live again. I'd love to find a blog on how to think about typing data that is used throughout the app in slightly different forms. Specifically User data: login, signup, profile. I made a few amusing mistakes.
 - Wrote interfaces for arrays of a certain type. ex: ICompany & ICompanyList, rather than using 'ICompany[]'. This led to me adding fields like length and map to the interface before I decided I was definitely doing it wrong.
 - Wrote 3 different user interfaces, then rewrote that into one user interface with all optional fields, seems wrong. Will probably end up making extensions of a parent user interface.

 ## 4. Converting Components
 - App had the most going to work on. I've had to revisit it to update function & prop types. Many functions are defined here and passed down.
 - Form Components, keystrokes are React.ChangeEvent and submits are React.FormEvent.
 - Typing hooks has been tricky
 - Typing the local storage custom hook, may need to reevaluate. This is one of the rarer cases where typing with a tuple has been the right thing to do, ex :[stateType, setStateFn]
 - The rest are ongoing...

 ## 5. Gained some insight
 So I waded throught the great explicit vs implicit typing, and I've determined that I was over ambitious in my initital endeavor to implement strict types on my code base. I turned off strict mode, remove most of the explicit typing, and got the app functioning in TypeScript. That was a much better step 1 than my old approach. From here. I can implement more types and interfaces, and weed out the number of implicit anys in the code. Small steady wins.