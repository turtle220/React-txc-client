import React from 'react'
import { CardTitle, Button } from 'reactstrap'
import IntlMessages from '@/utils/IntlMessages'

const Downloads = () => (
  <>
    <CardTitle className="mb-5">
      <IntlMessages id="pages.claims.downloads" />
    </CardTitle>

    <div className="text-center mt-2 mb-5">
      <Button outline size="lg" color="success" className="m-2">
        <IntlMessages id="pages.claims.download-cerved-scores" />
      </Button>
      <Button outline size="lg" color="success" className="m-2">
        <IntlMessages id="pages.claims.download-deloitte-phases" />
      </Button>
    </div>
  </>
)

export default Downloads
