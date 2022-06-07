import React from 'react'
import { 
    List, 
    Datagrid, 
    TextField, 
    ReferenceField, 
    EditButton, 
    Edit,
    Create, 
    SimpleForm, 
    ReferenceInput, 
    SelectInput, 
    TextInput,
    SimpleList
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const PostTitle = ({record}) => {
    return <span>Post {record ? `${record.title}` : ''}</span>
}

const postFilters = [
    <TextInput source='q' label='Search' alwaysOn />,
    <ReferenceInput source='userId' label='User' reference='users' allowEmpty>
        <SelectInput optionText='name' />
    </ReferenceInput>
]

export const PostList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
    // console.log(isSmall)

    return(
        <List filters={postFilters} {...props}>
            {
                isSmall ? (
                    <SimpleList
                        primaryText={record => record.title}
                        secondaryText={record => `${record.views} views`}
                        tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    />
                ) : (
                    <Datagrid>
                        <TextField source="id" />
                        <ReferenceField source='userId' reference='users'>
                            <TextField source='name' />
                        </ReferenceField>
                        <TextField source="title" />
                        {/* <TextField source="body" /> */}
                        <EditButton />
                    </Datagrid>
                )
            }      
        </List>
     
    )
}


export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput source="body" />
            <TextInput multiline source='body' />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
        <Create {...props}>
            <SimpleForm>
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="title" />
                <TextInput multiline source="body" />
           </SimpleForm>
        </Create>
);