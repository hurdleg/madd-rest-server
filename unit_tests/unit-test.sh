#!/bin/sh

# CourseId
CID=4
CID_FORM="$CID"

# true if running localhost; otherwise, false (on Bluemix)
IS_LOCALHOST=false

# POST and PUT
IS_CREATE=false
IS_UPDATE=false

# POST and PUT (multipart form)
IS_CREATE_FORM=false
IS_UPDATE_FORM=false

IS_DETAIL=false
IS_DELETE=false
IS_COUNT=true

############################################################################################################
# SET BASE_URL
############################################################################################################
if [ $IS_LOCALHOST = true ] ; then
    BASE_URL='http://localhost:3000'
else
    BASE_URL='https://madd.mybluemix.net'
fi

############################################################################################################
# POST /courses
############################################################################################################
if [ $IS_CREATE = true ] ; then
    curl -X POST --include --header "Content-Type: application/json" --data '{
        "courseId": 0,
        "code": "mad0000",
        "name": "POST /courses",
        "description": "POST /courses",
        "level": "2"
    }' $BASE_URL/courses  > create.txt
fi

############################################################################################################
# POST (multipart-form) /courses/form
############################################################################################################
if [ $IS_CREATE_FORM = true ] ; then
    curl -X POST --include --header "Content-Type: multipart/form-data" \
        -F "courseId=0" \
        -F "code=mad0001" \
        -F "name=POST /courses/form" \
        -F "description=POST /courses/form (multipart form)" \
        -F "level=2" \
        $BASE_URL/courses/form > createForm.txt
fi

############################################################################################################
# PUT /courses/:courseId
############################################################################################################
if [ $IS_UPDATE = true ] ; then
    curl -X PUT --include --header "Content-Type: application/json" --data '{
        "courseId": 4,
        "code": "MAD0000",
        "name": "PUT /courses/5",
        "description": "PUT /courses/5",
        "level": "2"
    }' $BASE_URL/courses/$CID > update.txt
fi

############################################################################################################
# PUT (multipart-form) /courses/:courseId/form
############################################################################################################
if [ $IS_UPDATE_FORM = true ] ; then
    curl -X PUT --include --header "Content-Type: multipart/form-data" \
        -F "courseId=$CID" \
        -F "code=MAD0001" \
        -F "name=PUT /courses/form" \
        -F "description=PUT /courses/form (multipart form)" \
        -F "level=2" \
        $BASE_URL/courses/$CID_FORM/form  > updateForm.txt
fi

############################################################################################################
# GET courses/$CID
############################################################################################################
if [ $IS_DETAIL = true ] ; then
    curl --include $BASE_URL/courses/$CID > detail.txt
fi

############################################################################################################
# DELETE courses/$CID
############################################################################################################
if [ $IS_DELETE = true ] ; then
    curl -X DELETE --include $BASE_URL/courses/$CID > delete.txt
fi

############################################################################################################
# GET courses/count
############################################################################################################
if [ $IS_COUNT = true ] ; then
    curl $BASE_URL/courses/count
fi

exit 0
