import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



    @Entity('role') 
    export class role {

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

    }

    @Entity('priority')
    export class priority {

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

    }

    @Entity('progress') 
    export class progress { 

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

    }

    @Entity('emp_details')
    export class empDetails {

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

        @Column()
        email: string;

        @Column()
        password: string;

        @Column()
        designation: string;

        @Column({nullable: true})
        tlId: number;

        @Column({nullable: true})
        proId: number;

        @ManyToOne(() => role, (e) => (e.id))
        @JoinColumn({ name: 'roleId'})
        roleId: number;

        @Column({nullable: true})
        createdAt: Date;

        @Column({nullable: true})
        updatedAt: Date;

        @Column({nullable: true})
        deletedAt: Date;

        @Column()
        isActive: boolean;

    }

    @Entity('project_details')
    export class projectDetails {

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        proName: string;

       @ManyToOne(() => empDetails, (e) => (e.id))
       @JoinColumn({ name: 'tlId'})
       tlId: number;

       @ManyToOne(() => empDetails, (e) => (e.id))
       @JoinColumn({ name: 'proId'})
       proId: number;
       
        @Column()
        startDate: Date;

        @Column()
        endDate: Date;

        @Column()
        thumbnail: string;

        @Column()
        createdAt: Date;

        @Column()
        updatedAt: Date;

        @Column()
        deletedAt: Date;

        @Column()
        createdBy: number;

        @Column()
        updatedBy: number;

        @Column()
        deletedBy: number;

    }

    @Entity('pro_emp_mapping')
    export class proEmpMapping {

        @PrimaryGeneratedColumn()
        id: number;

        @ManyToOne(() => projectDetails, (e) => (e.id))
        @JoinColumn({ name: 'proId'})
        proId: number;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'empId'})
        empId: number;

        @Column()
        createdAt: Date;

        @Column()
        updatedAt: Date;

        @Column()
        deletedAt: Date;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'createdBy'})
        createdBy: number;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'updatedBy'})
        updatedBy: number;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'deletedBy'})
        deletedBy: number;
    }

    @Entity('task_details')
    export class taskDetails { 

        @PrimaryGeneratedColumn()
        id: number;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'tlId'})
        tlId: number;
 
        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'proId'})
        proId: number;

        @Column()
        dueDate: Date;

        @ManyToOne(() => priority, (e) => (e.id))
        @JoinColumn({ name: 'priorityId'})
        priorityId: number;

        @ManyToOne(() => progress, (e) => (e.id))
        @JoinColumn({ name: 'progressId'})
        progressId  : number;

        @Column()
        createdAt: Date;

        @Column()
        updatedAt: Date;

        @Column()
        deletedAt: Date;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'createdBy'})
        createdBy: number;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'updatedBy'})
        updatedBy: number;

        @ManyToOne(() => empDetails, (e) => (e.id))
        @JoinColumn({ name: 'deletedBy'})
        deletedBy: number;

    }




