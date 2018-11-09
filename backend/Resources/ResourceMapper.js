const IdentifyMap = require("../IdentityMap.js");
const Book = require('./Book');
const Movie = require('./Movie');
const Magazine = require('./Magazine');
const Music = require('./Music');
const MySql = require('sync-mysql')
const Resource = require('./Resource')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

// ResourceMapper class that will make calls to the database whenever a resource needs to be added, updated or deleted
class ResourceMapper {


    static select(id){
        try {
            resource = IdentifyMap[id];
            return resource;
        } catch (e) {
            try{
                let resource = {};
                const resource_data = connection.query(`SELECT * FROM resource where id= '${id}'`);
                if (resource_data.length > 0){
                    const resource_id = resource_data[0].id;
                    const resource_type = resource_data[0].type;
                    console.log(resource_type);
                    console.log(`SELECT * FROM ${resource_type} where resource_id= '${resource_id}'`)
                    const query = connection.query(`SELECT * FROM ${resource_type} where resource_id= '${resource_id}'`)
                    const child_data = query[0];
                    child_data.title = resource_data[0].title;

                    console.log(child_data)
                    
                    switch(resource_type){
                        case "book":
                            resource = new Book(child_data,resource_id);
                            break;
                        case "magazine":
                            resource = new Magazine(child_data,resource_id);
                            break;      
                        case "movie":
                            resource = new Movie(child_data,resource_id);
                            console.log(resource);
                            break;        
                        case "music":
                            resource = new Music(child_data,resource_id);
                            break;
                    }
                    resource.resource_type = resource_type;
                    IdentifyMap[resource_id] = resource;
                }
                return {status: 0, message: 'Ok', results: resource};
            } catch (error){
                return{ status: 1, message: 'Error: ' + error, error}
            }

        }
 
    }

    static select(search,isadvancedSearch){
        if(isadvancedSearch){
            let verifyIfNoelement= { checked:[]};
            let AllInfo = [];
            let SearchInfoId = [];
            if(!(JSON.stringify(verifyIfNoelement) == JSON.stringify(search))){
                

                if(search['checked'].length !=0){  // if the client check at least one type
                    let parameter =false;
                    let query="";
                    for(let x=0;x<search['checked'].length;x++){
                        switch(search['checked'][x]){ // iterate over type checked
                            case "book": 
                                parameter = false;
                                 query =" Select * from book  LEFT JOIN resource on book.resource_id = resource.id ";
                                if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                    
                                    let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                    query+="where ";
                                    parameter = true;
                                    for(let i=0;i<titleToArray.length;i++){
                                        if(i==0)
                                        query+="title LIKE '%"+titleToArray[i]+"%' ";
                                        else{
                                        query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                    }
                                    }
                                    
                                }
                                if(!(search['pickedAuthor'] == undefined) && search['pickedAuthor'] != ''){
                                    if(parameter)
                                    query+=" OR author = '"+search['pickedAuthor']+"'";
                                    else{
                                        query+="where ";
                                        parameter = true;
                                        query+="author = '"+search['pickedAuthor']+"'";
                                    }}
                                if(!(search['ISBNSearch'] == undefined) && search['ISBNSearch'] != ''){
                                    if(parameter)
                                    query+=" OR ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    else{
                                        query+="where ";
                                        query+="ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    }
                                }
                                    const bookInfo = connection.query(query);
                                    for (let i=0; i<bookInfo.length;i++){
                                        const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+bookInfo[i]['resource_id']+"' ");
                                        
                                        if(SearchInfoId.indexOf(bookInfo[i]['resource_id']) == -1){
                                            SearchInfoId.push(bookInfo[i]['resource_id']);
                                            bookInfo[i]['loan']=LoanOrNot[0]['loan'];
                                            bookInfo[i]['available']=LoanOrNot[0]['available'];
                                            bookInfo[i]['restype']="book";
                                            AllInfo.push(bookInfo[i]);
                                        }
                                    }
                                    
                                break;
                            case "magazine": 
                             parameter = false;
                             query =" Select * from magazine  LEFT JOIN resource on magazine.resource_id = resource.id ";
                            if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                query+="where ";
                                parameter = true;
                                for(let i=0;i<titleToArray.length;i++){
                                    if(i==0)
                                    query+="title LIKE '%"+titleToArray[i]+"%' ";
                                    else{
                                    query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                }
                                }
                                
                            }
                            if(!(search['pickedPublisher'] == undefined) && search['pickedPublisher'] != ''){
                                if(parameter)
                                query+=" OR publisher = '"+search['pickedPublisher']+"'";
                                else{
                                    query+="where ";
                                    parameter = true;
                                    query+="publisher = '"+search['pickedPublisher']+"'";
                                }}
                                if(!(search['ISBNSearch'] == undefined) && search['ISBNSearch'] != ''){
                                    if(parameter)
                                    query+=" OR ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    else{
                                        query+="where ";
                                        query+="ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    }
                                }
                                const magazineInfo = connection.query(query);
                                for (let i=0; i<magazineInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+magazineInfo[i]['resource_id']+"' ");
                                    
                                    if(SearchInfoId.indexOf(magazineInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(magazineInfo[i]['resource_id']);
                                        magazineInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        magazineInfo[i]['available']=LoanOrNot[0]['available'];
                                        magazineInfo[i]['restype']="magazine";
                                        AllInfo.push(magazineInfo[i]);
                                    }
                                }
                                 break;
                            case "music":
                             parameter = false;
                             query =" Select * from music  LEFT JOIN resource on music.resource_id = resource.id ";
                            if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                query+="where ";
                                parameter = true;
                                for(let i=0;i<titleToArray.length;i++){
                                    if(i==0)
                                    query+="title LIKE '%"+titleToArray[i]+"%' ";
                                    else{
                                    query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                }
                                }
                                
                            }
                            if(!(search['pickedArtist'] == undefined) && search['pickedArtist'] != ''){
                                if(parameter)
                                query+=" OR artist = '"+search['pickedArtist']+"'";
                                else{
                                    query+="where ";
                                    parameter = true;
                                    query+="artist = '"+search['pickedArtist']+"'";
                                }}
                                const musicInfo = connection.query(query);
                                for (let i=0; i<musicInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+musicInfo[i]['resource_id']+"' ");
                                   
                                    if(SearchInfoId.indexOf(musicInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(musicInfo[i]['resource_id']);
                                        musicInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        musicInfo[i]['available']=LoanOrNot[0]['available'];
                                        musicInfo[i]['restype']="music";
                                        AllInfo.push(musicInfo[i]);
                                    }
                                }
                                 break;
                            case "movie":
                             parameter = false;
                             query =" Select * from movie  LEFT JOIN resource on movie.resource_id = resource.id ";
                            if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                query+="where ";
                                parameter = true;
                                for(let i=0;i<titleToArray.length;i++){
                                    if(i==0)
                                    query+="title LIKE '%"+titleToArray[i]+"%' ";
                                    else{
                                    query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                }
                                }
                                
                            }
                            if(!(search['pickedDirector'] == undefined) && search['pickedDirector'] != ''){
                                if(parameter)
                                query+=" OR director = '"+search['pickedDirector']+"'";
                                else{
                                    query+="where ";
                                    parameter = true;
                                    query+="director = '"+search['pickedDirector']+"'";
                                }}
                                const movieInfo = connection.query(query);
                                for (let i=0; i<movieInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+movieInfo[i]['resource_id']+"' ");
                                    
                                    if(SearchInfoId.indexOf(movieInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(movieInfo[i]['resource_id']);
                                        movieInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        movieInfo[i]['available']=LoanOrNot[0]['available'];
                                        movieInfo[i]['restype']="movie";
                                        AllInfo.push(movieInfo[i]);
                                    }
                                }
                                 break;
                        }
                    }
                    console.log(AllInfo);
                    return AllInfo;
                }else{
                    // if the client does not check a type
                    let parameter =false;
                    let query="";
                            if((!(search['titleSearch'] == undefined) && search['titleSearch'] != '') || (!(search['pickedAuthor'] == undefined) && search['pickedAuthor'] != '') ||(!(search['ISBNSearch'] == undefined) && search['ISBNSearch'] != '')){
                                 query =" Select * from book  LEFT JOIN resource on book.resource_id = resource.id ";
                                if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                    
                                    let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                    query+="where ";
                                    parameter = true;
                                    for(let i=0;i<titleToArray.length;i++){
                                        if(i==0)
                                        query+="title LIKE '%"+titleToArray[i]+"%' ";
                                        else{
                                        query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                    }
                                    }
                                    
                                }
                                if(!(search['pickedAuthor'] == undefined) && search['pickedAuthor'] != ''){
                                    if(parameter)
                                    query+=" OR author = '"+search['pickedAuthor']+"'";
                                    else{
                                        query+="where ";
                                        parameter = true;
                                        query+="author = '"+search['pickedAuthor']+"'";
                                    }}
                                if(!(search['ISBNSearch'] == undefined) && search['ISBNSearch'] != ''){
                                    if(parameter)
                                    query+=" OR ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    else{
                                        query+="where ";
                                        query+="ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    }
                                }
                                    const bookInfo = connection.query(query);
                                    for (let i=0; i<bookInfo.length;i++){
                                        const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+bookInfo[i]['resource_id']+"' ");
                                        
                                        if(SearchInfoId.indexOf(bookInfo[i]['resource_id']) == -1){
                                            SearchInfoId.push(bookInfo[i]['resource_id']);
                                            bookInfo[i]['loan']=LoanOrNot[0]['loan'];
                                            bookInfo[i]['available']=LoanOrNot[0]['available'];
                                            bookInfo[i]['restype']="book";
                                            AllInfo.push(bookInfo[i]);
                                        }
                                    }
                                }
                                
                             parameter = false;
                             if((!(search['titleSearch'] == undefined) && search['titleSearch'] != '') || (!(search['pickedPublisher'] == undefined) && search['pickedPublisher'] != '') || (!(search['ISBNSearch'] == undefined) && search['ISBNSearch'] != '')){
                             query =" Select * from magazine  LEFT JOIN resource on magazine.resource_id = resource.id ";
                            if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                query+="where ";
                                parameter = true;
                                for(let i=0;i<titleToArray.length;i++){
                                    if(i==0)
                                    query+="title LIKE '%"+titleToArray[i]+"%' ";
                                    else{
                                    query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                }
                                }
                                
                            }
                            if(!(search['pickedPublisher'] == undefined) && search['pickedPublisher'] != ''){
                                if(parameter)
                                query+=" OR publisher = '"+search['pickedPublisher']+"'";
                                else{
                                    query+="where ";
                                    parameter = true;
                                    query+="publisher = '"+search['pickedPublisher']+"'";
                                }}
                                if(!(search['ISBNSearch'] == undefined) && search['ISBNSearch'] != ''){
                                    if(parameter)
                                    query+=" OR ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    else{
                                        query+="where ";
                                        query+="ISBN_10 LIKE '%"+search['ISBNSearch']+"%' OR ISBN_13 LIKE '%"+search['ISBNSearch']+"%'";
                                
                                    }
                                }
                                const magazineInfo = connection.query(query);
                                for (let i=0; i<magazineInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+magazineInfo[i]['resource_id']+"' ");
                                    
                                    if(SearchInfoId.indexOf(magazineInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(magazineInfo[i]['resource_id']);
                                        magazineInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        magazineInfo[i]['available']=LoanOrNot[0]['available'];
                                        magazineInfo[i]['restype']="magazine";
                                        AllInfo.push(magazineInfo[i]);
                                    }
                                }
                            }
                             parameter = false;
                             if((!(search['titleSearch'] == undefined) && search['titleSearch'] != '') || (!(search['pickedArtist'] == undefined) && search['pickedArtist'] != '')){
                             query =" Select * from music  LEFT JOIN resource on music.resource_id = resource.id ";
                            if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                query+="where ";
                                parameter = true;
                                for(let i=0;i<titleToArray.length;i++){
                                    if(i==0)
                                    query+="title LIKE '%"+titleToArray[i]+"%' ";
                                    else{
                                    query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                }
                                }
                                
                            }
                            if(!(search['pickedArtist'] == undefined) && search['pickedArtist'] != ''){
                                if(parameter)
                                query+=" OR artist = '"+search['pickedArtist']+"'";
                                else{
                                    query+="where ";
                                    parameter = true;
                                    query+="artist = '"+search['pickedArtist']+"'";
                                }}
                                const musicInfo = connection.query(query);
                                for (let i=0; i<musicInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+musicInfo[i]['resource_id']+"' ");
                                   
                                    if(SearchInfoId.indexOf(musicInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(musicInfo[i]['resource_id']);
                                        musicInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        musicInfo[i]['available']=LoanOrNot[0]['available'];
                                        musicInfo[i]['restype']="music";
                                        AllInfo.push(musicInfo[i]);
                                    }
                                }
                            }
                             parameter = false;
                             if((!(search['titleSearch'] == undefined) && search['titleSearch'] != '') || (!(search['pickedDirector'] == undefined) && search['pickedDirector'] != '')){
                             query =" Select * from movie  LEFT JOIN resource on movie.resource_id = resource.id ";
                            if(!(search['titleSearch'] == undefined) && search['titleSearch'] != ''){
                                let titleToArray = search['titleSearch'].split(" "); // title to array by part
                                query+="where ";
                                parameter = true;
                                for(let i=0;i<titleToArray.length;i++){
                                    if(i==0)
                                    query+="title LIKE '%"+titleToArray[i]+"%' ";
                                    else{
                                    query+=" OR title LIKE '%"+titleToArray[i]+"%'";
                                }
                                }
                                
                            }
                            if(!(search['pickedDirector'] == undefined) && search['pickedDirector'] != ''){
                                if(parameter)
                                query+=" OR director = '"+search['pickedDirector']+"'";
                                else{
                                    query+="where ";
                                    parameter = true;
                                    query+="director = '"+search['pickedDirector']+"'";
                                }}
                                const movieInfo = connection.query(query);
                                for (let i=0; i<movieInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+movieInfo[i]['resource_id']+"' ");
                                    
                                    if(SearchInfoId.indexOf(movieInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(movieInfo[i]['resource_id']);
                                        movieInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        movieInfo[i]['available']=LoanOrNot[0]['available'];
                                        movieInfo[i]['restype']="movie";
                                        AllInfo.push(movieInfo[i]);
                                    }
                                }}
                                
                    return AllInfo;
                }
            }else{
                           
                            let query =" Select * from book LEFT JOIN resource on book.resource_id = resource.id ";
                            const bookInfo = connection.query(query);
                                for (let i=0; i<bookInfo.length;i++){
                                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+bookInfo[i]['resource_id']+"' ");
                                    
                                    if(SearchInfoId.indexOf(bookInfo[i]['resource_id']) == -1){
                                        SearchInfoId.push(bookInfo[i]['resource_id']);
                                        bookInfo[i]['loan']=LoanOrNot[0]['loan'];
                                        bookInfo[i]['available']=LoanOrNot[0]['available'];
                                        bookInfo[i]['restype']="book";
                                        AllInfo.push(bookInfo[i]);
                                    }
                                }

                                query =" Select * from magazine LEFT JOIN resource on magazine.resource_id = resource.id ";
                                const magazineInfo = connection.query(query);
                                    for (let i=0; i<magazineInfo.length;i++){
                                        const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+magazineInfo[i]['resource_id']+"' ");
                                        
                                        if(SearchInfoId.indexOf(magazineInfo[i]['resource_id']) == -1){
                                            SearchInfoId.push(magazineInfo[i]['resource_id']);
                                            magazineInfo[i]['loan']=LoanOrNot[0]['loan'];
                                            magazineInfo[i]['available']=LoanOrNot[0]['available'];
                                            magazineInfo[i]['restype']="magazine";
                                            AllInfo.push(magazineInfo[i]);
                                        }
                                    }

                                    query =" Select * from movie LEFT JOIN resource on movie.resource_id = resource.id ";
                                    const movieInfo = connection.query(query);
                                        for (let i=0; i<movieInfo.length;i++){
                                            const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+movieInfo[i]['resource_id']+"' ");
                                            
                                            if(SearchInfoId.indexOf(movieInfo[i]['resource_id']) == -1){
                                                SearchInfoId.push(movieInfo[i]['resource_id']);
                                                movieInfo[i]['loan']=LoanOrNot[0]['loan'];
                                                movieInfo[i]['available']=LoanOrNot[0]['available'];
                                                movieInfo[i]['restype']="movie";
                                                AllInfo.push(movieInfo[i]);
                                            }
                                        }
                                    
                                        query =" Select * from music LEFT JOIN resource on music.resource_id = resource.id ";
                                        const musicInfo = connection.query(query);
                                            for (let i=0; i<musicInfo.length;i++){
                                                const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+musicInfo[i]['resource_id']+"' ");
                                                
                                                if(SearchInfoId.indexOf(musicInfo[i]['resource_id']) == -1){
                                                    SearchInfoId.push(musicInfo[i]['resource_id']);
                                                    musicInfo[i]['loan']=LoanOrNot[0]['loan'];
                                                    musicInfo[i]['available']=LoanOrNot[0]['available'];
                                                    musicInfo[i]['restype']="music";
                                                    AllInfo.push(musicInfo[i]);
                                                }
                                            }
                                            console.log(AllInfo);
                                            return AllInfo;
            }
        }else{
            
            let SearchToArray = search.split(" ");
            console.log(SearchToArray);
            let AllInfo = [];
            let SearchInfoId = [];
            for(let x=0;x<SearchToArray.length;x++){
                if(SearchToArray[0] !=''){
                const bookInfo = connection.query("SELECT * FROM book LEFT JOIN resource on book.resource_id = resource.id where title LIKE '%"+SearchToArray[x]+"%' OR author LIKE '%"+SearchToArray[x]+"%' OR isbn_10 LIKE '%"+SearchToArray[x]+"%' OR isbn_13 LIKE '%"+SearchToArray[x]+"%'");
                for (let i=0; i<bookInfo.length;i++){
                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+bookInfo[i]['resource_id']+"' ");
                    console.log(LoanOrNot[0]['loan']);
                    if(SearchInfoId.indexOf(bookInfo[i]['resource_id']) == -1){
                        SearchInfoId.push(bookInfo[i]['resource_id']);
                        bookInfo[i]['loan']=LoanOrNot[0]['loan'];
                        bookInfo[i]['available']=LoanOrNot[0]['available'];
                        bookInfo[i]['restype']="book";
                        AllInfo.push(bookInfo[i]);
                    }
                }
                
                const magazineInfo = connection.query("SELECT * FROM magazine LEFT JOIN resource on magazine.resource_id = resource.id where title LIKE '%"+SearchToArray[x]+"%' OR publisher LIKE '%"+SearchToArray[x]+"%' OR isbn_10 LIKE '%"+SearchToArray[x]+"%' OR isbn_13 LIKE '%"+SearchToArray[x]+"%'");
                for (let i=0; i<magazineInfo.length;i++){
                    if(SearchInfoId.indexOf(magazineInfo[i]['resource_id']) == -1){
                        const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+magazineInfo[i]['resource_id']+"' ");
                        SearchInfoId.push(magazineInfo[i]['resource_id']);
                        magazineInfo[i]['loan']=LoanOrNot[0]['loan'];
                        magazineInfo[i]['available']=LoanOrNot[0]['available'];
                        magazineInfo[i]['restype']="magazine";
                        AllInfo.push(magazineInfo[i]);
                    }
                }
                const movieInfo = connection.query("SELECT * FROM movie LEFT JOIN resource on movie.resource_id = resource.id where title LIKE '%"+SearchToArray[x]+"%' OR director LIKE '%"+SearchToArray[x]+"%'");
                for (let i=0; i<movieInfo.length;i++){
                    if(SearchInfoId.indexOf(movieInfo[i]['resource_id']) == -1){
                        const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+movieInfo[i]['resource_id']+"' ");
                    SearchInfoId.push(movieInfo[i]['resource_id']);
                    movieInfo[i]['loan']=LoanOrNot[0]['loan'];
                    movieInfo[i]['available']=LoanOrNot[0]['available'];
                    movieInfo[i]['restype']="movie";
                    AllInfo.push(movieInfo[i]);
                    }
                }
                const musicInfo = connection.query("SELECT * FROM music LEFT JOIN resource on music.resource_id = resource.id where title LIKE '%"+SearchToArray[x]+"%'");
                for (let i=0; i<musicInfo.length;i++){
                    if(SearchInfoId.indexOf(musicInfo[i]['resource_id']) == -1){
                    const LoanOrNot = connection.query("SELECT SUM(CASE WHEN user_id is NOT NULL THEN 1 else 0 END) as loan,  SUM(CASE WHEN user_id is NULL THEN 1 else 0 END) as available FROM resource_line_item where resource_id = '"+musicInfo[i]['resource_id']+"' ");
                    SearchInfoId.push(musicInfo[i]['resource_id']);
                    musicInfo[i]['loan']=LoanOrNot[0]['loan'];
                    musicInfo[i]['available']=LoanOrNot[0]['available'];
                    musicInfo[i]['restype']="music";
                    AllInfo.push(musicInfo[i]);
                    }
                }}
            };
            return AllInfo;
        }
    }


    static selectAll(){
        try{

            let resources = [];
            let resource = {};

            const book_data = connection.query(`select 
            r.title,
            r.id,
            b.author,
            b.format,
            b.pages,
            b.publisher,
            b.language,
            b.isbn_10,
            b.isbn_13,
            b.resource_id
            from resource as r
            left join book as b on r.id=b.resource_id
            where type='book'
            `);
            const music_data = connection.query(`select 
            r.title,
            r.id,
            mu.type,
            mu.artist,
            mu.release,
            mu.ASIN,
            mu.label,
            mu.resource_id
            from resource as r
            left join music as mu on r.id=mu.resource_id
            where r.type='music'
            `);
            const movie_data = connection.query(`
            select 
            r.title,
            r.id,
            mo.director,
            mo.producers,
            mo.actors,
            mo.language,
            mo.subtitles,
            mo.dubbed,
            mo.release_date,
            mo.run_time,
            mo.resource_id
            from resource as r
            left join movie as mo on r.id=mo.resource_id
            where r.type='movie'
            `);
            const magazine_data = connection.query(`
            select 
            r.title,
            r.id,
            ma.publisher,
            ma.language,
            ma.isbn_10,
            ma.isbn_13,
            ma.resource_id
            from resource as r
            left join magazine as ma on r.id=ma.resource_id
            where r.type='magazine'
            `);
            for (let i=0; i<book_data.length;i++){
                resource = book_data[i]
                resource.resource_type = 'book';
                IdentifyMap[resource.id] = resource;
                resources.push( {"type": 'book', "resource_data": resource  } );
                
            }
            for (let i=0; i<magazine_data.length;i++){
                resource = magazine_data[i]
                resource.resource_type = 'magazine';
                IdentifyMap[resource.id] = resource;
                resources.push( {"type": 'magazine', "resource_data": resource  } );
                
            }
            for (let i=0; i<music_data.length;i++){
                resource = music_data[i]
                resource.resource_type = 'music'; 
                IdentifyMap[resource.id] = resource;
                resources.push( {"type": 'music', "resource_data": resource  } );
               
            }
            for (let i=0; i<movie_data.length;i++){
                resource = movie_data[i]
                resource.resource_type = 'movie';
                IdentifyMap[resource.id] = resource;
                resources.push( {"type": 'movie', "resource_data": resource  } );
                
            }

            return {status: 0, message: 'Ok', results: resources};
        } catch (error){
            return{ status: 1, message: 'Error: ' + error, error}
        }
    }



    // Method to insert resource into resources table 
    static insert(resource_obj, type) {
        
        try{
            type = type.toLowerCase();
            const parent_obj = {"type":type, "title": resource_obj.title, "id":0}; // parent resource obj fits this schema
            delete resource_obj.id; // make it fit for the child table 
            delete resource_obj.title; // make it fit for the child table
            const parent_data = connection.query(`INSERT INTO resource VALUES( ${this.objectToQueryString(parent_obj)} )`); // Insert resource data (parent)
            resource_obj.resource_id = parent_data.insertId; // with the insert id of the resource table, reference the fk of the child data to the pk of the parent
            resource_obj.id = 0;
            connection.query(`INSERT INTO ${type} VALUES (${this.objectToQueryString(resource_obj)})`); // Insert into the child table the child data (book, magazine, music, movie)
            const resource_line_item = {"id":0, "resource_id": parent_data.insertId, "user_id": null, "date_due": "Never"}; // declare schema for the line item instance (this table represents the number of instances)
            connection.query(`INSERT INTO resource_line_item (id, resource_id, user_id, date_due) VALUES(0, ${resource_line_item.resource_id}, NULL, '${resource_line_item.date_due}')`); 
            const resource = this.select(parent_data.insertId).results
            return {status: 0, message: 'Resource Added', results: resource};
        }
        catch(error){
            return{ status: 1, message: 'Error' +error, error}
        }
    }

    // This method will make a sql call to delete an entire resource record once called
    static delete(id) {
        try{
            delete IdentifyMap[id];
            const data = connection.query(`SELECT * FROM resource where id=${id}`);
            if (data.length > 0){
                const type = data[0].type;
                const resource_line_item_data = connection.query(`DELETE FROM resource_line_item WHERE resource_id=${id}`);
                const child_data = connection.query(`DELETE FROM ${type} where resource_id=${id}`);
                const resource_data = connection.query(`DELETE FROM resource where id=${id}`);
                return {status : 0, message : 'Resource deleted.'};
            } else {
                return {status : 1, message : 'Nothing to delete.'}
            }
        }
        catch(error){
            return {status : 1, message : 'Error' +error, error}
        }
    }

    // Method to update relevant resource given the new information
    static update(resource_obj, type) {
        try {
            console.log(resource_obj)
            console.log(type);
            type = type.toLowerCase();
            connection.query(`UPDATE resource SET title = '${resource_obj.title}' WHERE id='${resource_obj.id}'`);
            const id = resource_obj.id;
            delete resource_obj.id;
            delete resource_obj.title;
            const data = connection.query(`UPDATE ${type} SET ${this.objectToUpdateString(resource_obj)} WHERE resource_id='${id}'`);
            return {status : 0, message : 'Resource updated.', results : data}
        }
        catch(error) {
            return {status : 1, message : 'Error' +error, error}
        }
    }
    //Get all authors for advanced search
    static getAllAuthors(){
        try{
          
            const data = connection.query(`SELECT DISTINCT author from book`);
            
            return {status: 0, message: 'Ok', results: data};
        } catch (error){
            return{ status: 1, message: 'Error: ' + error, error}
        }
}

    //Get all authors for advanced search
    static getAllDirectors(){
     try{

        const data = connection.query(`SELECT DISTINCT director from movie`);
       
        return {status: 0, message: 'Ok', results: data};
     } catch (error){
        return{ status: 1, message: 'Error: ' + error, error}
    }
    }

    //Get all publishers for advanced search
    static getAllPublishers(){
        try{
   
           const data = connection.query(`select distinct publisher from magazine`);
          
           return {status: 0, message: 'Ok', results: data};
        } catch (error){
           return{ status: 1, message: 'Error: ' + error, error}
       }
       }

       //Get all artists for advanced search
    static getAllArtists(){
        try{
   
           const data = connection.query(`select distinct artist from music`);
          
           return {status: 0, message: 'Ok', results: data};
        } catch (error){
           return{ status: 1, message: 'Error: ' + error, error}
       }
       }

    // Helper. This method turns an object into a string formated for an SQL query
    static objectToQueryString(object) { 
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }

    static objectToUpdateString(object) { 
        return Object.keys(object).map(key => key + "='" + object[key] + "'").join(' , ')
    }
}

module.exports = ResourceMapper;