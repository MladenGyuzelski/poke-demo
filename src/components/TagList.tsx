
type Props = {
  tags?: string[];
};

const TagList = (props: Props) => {
  const { tags } = props;

  return (<>
    {tags?.map((tag) => (
      <div className="badge badge-outline">{tag}</div>
    ))}
  </>);
}

export default TagList;