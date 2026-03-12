import EmptyState from '@/components/ui/empty-state';
import { deleteprojectbyid, duplicateprojectbyid, Editprojectbyid, getallplaygroundsofUser } from '@/features/dashboard/actions';
import AddNewButton from '@/features/dashboard/components/add-new-button'
import AddRepoButton from '@/features/dashboard/components/add-repo-btn'
import ProjectTable from '@/features/dashboard/components/project-table';
import React from 'react'

const page = async() => {
    const playgrounds = await getallplaygroundsofUser();
  return (
    <div className='flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                <AddNewButton/>
                <AddRepoButton/>
            </div>

            <div className='mt-10 flex flex-col justify-center items-center w-full'>
                    {
                        playgrounds && playgrounds.length === 0 ? (<EmptyState title='no projects found' description='Create your new project to get started!' imagesrc='empty-state.svg' />):// add playground table 
                        <ProjectTable
                        // @ts-ignore
                        projects={playgrounds ||[]}
                        onDeleteProject={deleteprojectbyid}
                        onUpdateProject={Editprojectbyid}
                        onDuplicateProject={duplicateprojectbyid}

                        />
                    }
            </div>
    </div>
  )
}

export default page
