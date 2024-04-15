1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.
   PureComponent implements lifecycle method `shouldComponentUpdate()` that is responsible for component
   re-render in that way, that current state and props each time shallowly compared with new values.
   It helps to avoid unnecessary renders. Component doesn't have this method.
   PureComponent should be used only with simple data structures, without nested objects or arrays.
   Cause otherwise component won't detect changes.

2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?
   Cause context has higher priority than shouldComponentUpdate, and component will re-render when
   context value changed.

3. Describe 3 ways to pass information from a component to its PARENT.
   Callback (pass function as props from parent to child, and trigger it the child component when
   parent should be notified)
   Context (to share data between components)
   Lifting state up (to share data between components)
   Redux or other state management libraries

4. Give 2 ways to prevent components from re-rendering.
   To prevent re-rendering we can use memoization React.memo or PureComponent

5. What is a fragment and why do we need it? Give an example where it might break my app.
   Fragment is group of html elements that doesn't have one parent element.
   It's used to return single root element, because or React architecture.
   I've never had problems with it, but I can imagine if there are some styles
   on the parent (flex, grid) that should apply to children, In case of fragments,
   styles will be applied to all elements within the fragment, because there is no wrapper.

6. Give 3 examples of the HOC pattern.
   React.memo
   HOC for permissions or auth
   to get window dimensions

7. What's the difference in handling exceptions in promises,
   callbacks and async…await?
   for handling exceptions with async/await we need to use `try catch` block

8. How many arguments does `setState` take and why is it async.
   `setState` has 2 arguments - state property to update and callback as optional parameter
   callback will be executed when state is updated
   `setState` is async for performance reasons, because it might block browser work.
   Also state update operations can be batched to provide better performance.

9. List the steps needed to migrate a Class to Function
   Component.

   - convert class to function using function expression ('function Component') or
   declaration ('const Component = () => {}' )
   - replace lifecycle methods with `useEffect` hooks
   - move state to `useState` hooks 
   - delete render method, put all the component code into `return {...}`
   - delete reference to this (props, state)



10. List a few ways styles can be used with components.
   - css in js 
   - css modules
   - styled components
   - css, scss
   - inline styles 
   - libraries like tailwind 


11. How to render an HTML string coming from the server.
   HTML string should be sanitized first.
   `dangerouslySetInnerHTML` can be used and 3rd party libraries
