"use strict";
/**
 * Created by laurence-ho on 21/07/17.
 */
var db = require('./database/db.service');
var authentication = {};
authentication.checkCampOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send({ message: err });
            }
            else {
                connection.query('SELECT * FROM campgrounds WHERE id = ?', [req.params.id], function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        if (rows[0].user_id === req.user.id) {
                            next();
                        }
                        else {
                            res.status(403).send({ message: 'You have no permission' });
                        }
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ message: 'Please Login First' });
    }
};
authentication.checkCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send({ message: err });
            }
            else {
                connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        if (rows[0].user_id === req.user.id) {
                            next();
                        }
                        else {
                            res.status(403).send({ message: 'You have no permission' });
                        }
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ message: 'Please Login First' });
    }
};
authentication.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).send({ message: 'Please Login First' });
};
module.exports = authentication;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRztBQUVILElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQzVDLElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQztBQUU3QixjQUFjLENBQUMsY0FBYyxHQUFHLFVBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFTO0lBQzdELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFDLEdBQVEsRUFBRSxVQUFlO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBQyxHQUFRLEVBQUUsSUFBUztvQkFDL0YsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUVyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7b0JBQ3RDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLElBQUksRUFBRSxDQUFDO3dCQUNSLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDO3dCQUMzRCxDQUFDO29CQUNGLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUVGLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxVQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUztJQUNoRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBQyxHQUFRLEVBQUUsVUFBZTtZQUMxQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUMscUNBQXFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQUMsR0FBUSxFQUFFLElBQVM7b0JBQ3BHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFckIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO29CQUN0QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNyQyxJQUFJLEVBQUUsQ0FBQzt3QkFDUixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFDLENBQUMsQ0FBQzt3QkFDM0QsQ0FBQztvQkFDRixDQUFDO2dCQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7QUFDRixDQUFDLENBQUM7QUFFRixjQUFjLENBQUMsVUFBVSxHQUFHLFVBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFTO0lBQ3pELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUM7QUFFRixpQkFBUyxjQUFjLENBQUMiLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBsYXVyZW5jZS1obyBvbiAyMS8wNy8xNy5cclxuICovXHJcblxyXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vZGF0YWJhc2UvZGIuc2VydmljZScpO1xyXG5sZXQgYXV0aGVudGljYXRpb246IGFueSA9IHt9O1xyXG5cclxuYXV0aGVudGljYXRpb24uY2hlY2tDYW1wT3duZXIgPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcclxuXHRpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcblx0XHRkYi5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBjYW1wZ3JvdW5kcyBXSEVSRSBpZCA9ID8nLCBbcmVxLnBhcmFtcy5pZF0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKHttZXNzYWdlOiBlcnJ9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmIChyb3dzWzBdLnVzZXJfaWQgPT09IHJlcS51c2VyLmlkKSB7XHJcblx0XHRcdFx0XHRcdFx0bmV4dCgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHJlcy5zdGF0dXMoNDAzKS5zZW5kKHttZXNzYWdlOiAnWW91IGhhdmUgbm8gcGVybWlzc2lvbid9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdQbGVhc2UgTG9naW4gRmlyc3QnfSk7XHJcblx0fVxyXG59O1xyXG5cclxuYXV0aGVudGljYXRpb24uY2hlY2tDb21tZW50T3duZXIgPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcclxuXHRpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcblx0XHRkYi5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XHJcblx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBjb21tZW50cyBXSEVSRSBpZCA9ID8nLCBbcmVxLnBhcmFtcy5jb21tZW50X2lkXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHJvd3NbMF0udXNlcl9pZCA9PT0gcmVxLnVzZXIuaWQpIHtcclxuXHRcdFx0XHRcdFx0XHRuZXh0KCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdZb3UgaGF2ZSBubyBwZXJtaXNzaW9uJ30pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXMuc3RhdHVzKDQwMykuc2VuZCh7bWVzc2FnZTogJ1BsZWFzZSBMb2dpbiBGaXJzdCd9KTtcclxuXHR9XHJcbn07XHJcblxyXG5hdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluID0gKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogYW55KSA9PiB7XHJcblx0aWYgKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG5cdFx0cmV0dXJuIG5leHQoKTtcclxuXHR9XHJcblx0cmVzLnN0YXR1cyg0MDMpLnNlbmQoe21lc3NhZ2U6ICdQbGVhc2UgTG9naW4gRmlyc3QnfSk7XHJcbn07XHJcblxyXG5leHBvcnQgPSBhdXRoZW50aWNhdGlvbjtcclxuXHJcbiJdfQ==