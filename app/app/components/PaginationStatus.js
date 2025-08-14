import React from 'react';

export default function PaginationStatus({ 
  currentPage, 
  totalCount, 
  displayedCount, 
  hasMore, 
  loading, 
  onLoadMore 
}) {
  return (
    <div className="pagination-status">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="pagination-info">
              <small className="text-muted">
                Showing {displayedCount} of {totalCount} products
                {currentPage > 1 && ` (Page ${currentPage})`}
              </small>
            </div>
            
            <div className="pagination-controls">
              {hasMore && !loading && (
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={onLoadMore}
                >
                  Load More
                </button>
              )}
              
              {loading && (
                <div className="d-flex align-items-center">
                  <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <small className="text-muted">Loading more...</small>
                </div>
              )}
              
              {!hasMore && displayedCount > 0 && (
                <small className="text-muted">
                  <i className="fa fa-check-circle text-success me-1"></i>
                  All products loaded
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 