import './content-heading.scss';

export const Heading = ({
    title,
    description,
}: {
    title: string,
    description: string
}) => {
    return (
        <div>
            <h2 className="headling-title">{title}</h2>
            <p className="heading-description">{description}</p>
        </div>
    );
}