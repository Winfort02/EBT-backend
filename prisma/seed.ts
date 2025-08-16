import { PrismaClient, UserRole } from '@prisma/client'
import { hash } from 'bcrypt';
const prisma = new PrismaClient()

async function main() {
 await prisma.$connect();

 await prisma.$transaction(async (p) => {

  // Create User Role if no current role available
  const roles = await p.userRole.findMany();
  if (!roles.length) {
    await p.userRole.createMany({ 
        data: [{ role: 'ADMIN'}, {role: 'EMPLOYEE'}] 
      });
  }
  
  // Get Role Admin ID
  const role = await p.userRole.findFirst({ where: { role: 'ADMIN'}}) as UserRole;

  // Create Admin Account
  await p.user.create({
    data: {
        email: 'admin@gmail.com',
        password: await hash('admin123', 10),
        roleId: role.id,
        displayName: 'Admin'
    }
  })
 });
}

main().then(async () => await prisma.$disconnect()).catch(async () => await prisma.$disconnect());