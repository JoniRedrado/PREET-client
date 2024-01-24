/* eslint-disable react/prop-types */
export default function Card({ hotel }) {
  
  const { name } = hotel;

  return (
    <div>
      <p>{name}</p>
    </div>
  )
}