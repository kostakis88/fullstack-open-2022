const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return <b>total of {total} exercises</b>
}

const Course = ({course: { name, parts }}) => {
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default Course