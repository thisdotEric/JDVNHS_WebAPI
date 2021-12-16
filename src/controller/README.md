*Example call to the WEB API:* **localhost:4000/v1/subject/PreCal/students**

<table>
    <tr>
        <td>Route</td>
        <td>Description</td>
        <td>Parameters</td>
    </tr>
    <tr>
        <td colspan="3"  align='center'>Home Route</td>
    </tr>
    <tr>
        <td>GET /v1</td>
        <td>Home route of the WebAPI. Returns <em property='italic'>"JDVNHS WebAPI"</em></td>
        <td>None</td>
    </tr>
    <tr>
        <td colspan="3"  align='center'>Subject Routes ( /subject ) </td>
    </tr>
    <tr>
        <td>GET /:subject_name/students</td>
        <td>Returns all the enrolled students on a given subject</td>
       <td>
            <ul>
                <li><strong>:subject_name </strong> = Shorthand name of the subject</li>
            </ul>
        </td>
    </tr> 
    <tr>
        <td>GET /:subject_name/subject-teacher</td>
        <td>Returns the subject teacher handling the subject </td>
        <td>
            <ul>
                <li><strong>:subject_name </strong> = Shorthand name of the subject</li>
            </ul>
        </td>
    </tr>   
    <tr>
        <td>GET /:subject_name/attendance/:lecture_id </td>
        <td>Returns list of attendance from the given lecture idenditifier  </td>
        <td>
            <ul>
                <li><strong>:subject_name </strong> = Shorthand name of the subject</li>
                <li><strong>:lecture_id </strong> = Lecture id</li>
            </ul>
        </td>
    </tr>
     <tr>
        <td>POST /:subject_name/attendance/ </td>
        <td> Add new attendance record </td>
        <td>
            <ul>
                <li><strong>:subject_name </strong> = Shorthand name of the subject</li> 
                <li><strong>request body </strong> = List of attendance ( example: <code>{
                      "attendance": [
                        {
                          "lecture_id": 1,
                          "LRN": "123456789120",
                          "status": "present"
                        },
                        {
                          "lecture_id": 1,
                          "LRN": "123456789119",
                          "status": "absent"
                        }
                      ]
                    } </code> )
                </li>
            </ul>
        </td>
    </tr>
     <tr>
        <td>DELETE /:subject_name/student/:lrn </td>
        <td> Remove a student from class </td>
        <td>
            <ul>
               <li><strong>:subject_name </strong> = Shorthand name of the subject</li>
                <li><strong>:lrn </strong> = Student's LRN to be removed from the class </li>
            </ul>
        </td>
    </tr>
     <tr>
        <td>GET /:subject_name/scores/:assessment_id </td>
        <td> Get all the student scores from the given subject name and assessment id </td>
        <td>
            <ul>
               <li><strong>:subject_name </strong> = Shorthand name of the subject</li>
                <li><strong>:assessment_id </strong> = Assessment id </li>
            </ul>
        </td>
    </tr>
</table>
