import { useParams } from 'react-router-dom';

export default function PostEdit() {
  const { id } = useParams();

  return (
    <>
      <div>{id}</div>
      <div>edit</div>
    </>
  );
}
