import React from 'react'
import { Card, CardContent } from '../ui/card'

const UserInfoRow = () => {
  return (
    <Card className='w-full'>
      <CardContent>
        <div className='w-full flex justify-center place-items-center'>
          <div className='flex-1 bg-RED'></div>
          <div className='flex-2.5 bg-BLUE'></div>
        </div>
      </CardContent>
    </Card>
  )

}
export default UserInfoRow
