   SELECT p.*, 
           ST_Distance_Sphere(
             point(l.longitude, l.latitude), 
             point(?, ?)
           ) AS distance,
          p.userId AS userId
    FROM Pharmacy p
    
    JOIN PharmacyLocation l ON p.addressId = l.id
    ORDER BY distance
    LIMIT ?