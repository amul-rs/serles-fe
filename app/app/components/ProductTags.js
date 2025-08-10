import Link from "next/link";

export default function ProductTags({ tags = [], maxTags = 5 }) {
  if (!tags.length) return null;

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="d-flex flex-wrap gap-2">
          {tags.slice(0, maxTags).map((tag) => (
            <Link 
              key={tag.id} 
              href={`/cakes/tags/${tag.slug}`}
              className="btn btn-outline-secondary btn-sm"
              style={{
                border: '1px solid #e1e1e1',
                color: '#000000',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 